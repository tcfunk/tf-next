import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"

import { drupal } from "lib/drupal"
import { NodeProject } from "components/node--project"
import { Layout } from "components/layout"
import { DrupalNodeSimplePath } from "components/node--article--teaser"

const RESOURCE_TYPES = ["node--project"]

interface NodePageProps {
  project: DrupalNodeSimplePath
}

export default function NodePage({ project }: NodePageProps) {
  if (!project) return null

  return (
    <Layout>
      <Head>
        <title>{project.title}</title>
        <meta name="description" content={project.body.summary} />
      </Head>
      {<NodeProject node={project} />}
    </Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: [], // idk what this should be :\ 
    // paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context, { pathPrefix: '/projects/'})

  if (!path) {
    return {
      notFound: true,
    }
  }

  const slug = path?.entity?.path
  const graphqlUrl = drupal.buildUrl("/graphql")
  const response = await drupal.fetch(graphqlUrl.toString(), {
    method: "POST",
    withAuth: true,
    body: JSON.stringify({ query: `
      query NodeProjectByRoute {
        route(path: "${slug}") {
          ... on RouteInternal {
            entity {
              ... on NodeProject {
                id
                title
                created {
                  time
                }
                body {
                  processed
                  summary
                }
              }
            }
          }
        }
      }
    `,
    })
  })

  const { data } = await response.json()
  // const node = data.route.entity
  // throw new Error(`Failed to fetch resource: ${JSON.stringify(node)}`)

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!data) {
    throw new Error(`Failed to fetch resource: ${path.label}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && data?.status === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project: data.route.entity
    },
  }
}

