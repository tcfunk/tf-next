import { DrupalNodeSimplePath } from "./node--article--teaser"
import { Section } from "./section"

interface NodeArticleProps {
  node: DrupalNodeSimplePath
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
  return (
    <Section {...props}>
      <h1 className="text-center text-3xl font-serif">{node.title}</h1>

      {node.body && (
        <div className="mx-auto mt-5 max-w-prose" dangerouslySetInnerHTML={{
          __html: node.body.processed
        }}></div>
      )}

    </Section>
  )
}
