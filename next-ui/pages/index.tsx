import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { DrupalNodeSimplePath, NodeArticleTeaser } from "components/node--article--teaser"

interface IndexPageProps {
  nodes: DrupalNodeSimplePath[]
}

export default function IndexPage({ nodes }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <NodeArticleTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
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
        nodeArticles(first: 10) {
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
          }
        }
      }
    `})
  })

  const { data } = await response.json()

  return {
    props: {
      nodes: data?.nodeArticles?.nodes ?? []
    },
  }
}