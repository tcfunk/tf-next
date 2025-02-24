import { useEffect } from "react"
import { DrupalNodeSimplePath } from "./node--article--teaser"
import { Section } from "./section"

import hljs from 'highlight.js'
import cpp from 'highlight.js/lib/languages/cpp'
hljs.registerLanguage('cpp', cpp)

interface NodeProjectProps {
  node: DrupalNodeSimplePath
}

export function NodeProject({ node, ...props }: NodeProjectProps) {
  useEffect(() => {
    hljs.highlightAll()
  }, [])

  function highlighter(html) {
    var txt = document.createElement('textarea')
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <Section {...props}>
      <h1 className="text-center text-5xl font-serif">{node.title}</h1>

      {node.body && (
        <div className="mx-auto mt-5 max-w-prose prose prose-amber prose-invert" dangerouslySetInnerHTML={{
          __html: node.body.processed,
        }}></div>
      )}

    </Section>
  )
}
