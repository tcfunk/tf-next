import Image from "next/image"
import { DrupalNodeSimplePath } from "./node--article--teaser";

interface NodeProjectTeaserProps {
  node: DrupalNodeSimplePath
}

export function NodeProjectTeaser({ node, ...props }: NodeProjectTeaserProps) {
  return (
    <div className="flex flex-col items-center gap-x-8 hover:scale-110 overflow-hidden rounded-md bg-slate-800 md:flex-row">
      <div className="shrink-0">
        <Image
          src={node.coverGif.mediaGif.url}
          alt={node.coverGif.mediaGif.alt}
          height={node.coverGif.mediaGif.height}
          width={node.coverGif.mediaGif.width}
          suppressHydrationWarning />
      </div>
      <div>
        <div className="flex flex-col items-center gap-y-2 md:flex-row">
          <div className="text-xl font-semibold">{node.title}</div>
        </div>
        <div className="mt-3 text-gray-400">
          {node.body.summary}
        </div>
      </div>
    </div>
  )
}