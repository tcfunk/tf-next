import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"

import { drupal } from "lib/drupal"
import { NodeArticle } from "components/node--article"
import { NodeBasicPage } from "components/node--basic-page"
import { Layout } from "components/layout"
import { DrupalNodeSimplePath } from "components/node--article--teaser"

const RESOURCE_TYPES = ["node--page", "node--article"]

interface NodePageProps {
  resource: DrupalNodeSimplePath
}

export default function NodePage({ resource }: NodePageProps) {
  if (!resource) return null

  return (
    <Layout>
      <Head>
        <title>{resource.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      {<NodeArticle node={resource} />}
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
  const path = await drupal.translatePathFromContext(context)

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
      query NodeArticleByRoute {
        route(path: "${slug}") {
          ... on RouteInternal {
            entity {
              ... on NodeArticle {
                id
                title
                created {
                  time
                }
                body {
                  processed
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
      resource: data.route.entity
    },
  }
}
