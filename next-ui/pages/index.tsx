import Head from "next/head"
import Link from "next/link"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { Section } from "components/section"
import SectionHeader from "components/section-header"
import { DrupalNodeSimplePath, NodeArticleTeaser } from "components/node--article--teaser"
import { NodeProjectTeaser } from "components/node--project--teaser"

interface IndexPageProps {
  articles: DrupalNodeSimplePath[],
  projects: DrupalNodeSimplePath[],
}

export default function IndexPage({ articles, projects }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <Section>
        <SectionHeader type={"Projects"} />
        
        <div className="flex flex-col gap-6" suppressHydrationWarning>
          {projects?.length ? (
            projects.map(({node}) => (
              <Link key={node.id} href={node.path}>
                <NodeProjectTeaser node={node} />
              </Link>
            ))
            ) : (
              <p className="py-4">Nothing here yet</p>
            )
          }
        </div>
      </Section>
      
      <Section>
        <SectionHeader type={"Posts"} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles?.length ? (
            articles.map((node) => (
              <Link key={node.id} href={node.path} className="hover:translate-y-1">
                <NodeArticleTeaser node={node} />
              </Link>
            ))
          ) : (
            <p className="py-4">Nothing here yet</p>
          )}
        </div>
      </Section>

    </Layout>
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {

  const graphqlUrl = drupal.buildUrl("/graphql")

  const response = await drupal.fetch(graphqlUrl.toString(), {
    method: "POST",
    withAuth: true,
    body: JSON.stringify({ query: `
      query {
        nodeArticles(first: 3) {
          nodes {
            id
            title
            path
            body {
              processed
            }
            created {
              time
            }
            image {
              ... on MediaImage {
                id
                name
                mediaImage {
                  url
                  alt
                }
              }
            }
          }
        }
        nodeProjects(first: 3) {
          edges {
            node {
              body {
                summary
              }
              id
              path
              title
              coverGif {
                ... on MediaGif {
                  id
                  mediaGif {
                    url
                    alt
                    height
                    width
                  }
                }
              }
            }
          }
        }
      }
    `})
  })

  const { data } = await response.json()

  return {
    props: {
      articles: data?.nodeArticles?.nodes ?? [],
      projects: data?.nodeProjects?.edges ?? [],
    },
  }
}
