import Image from "next/image"
import Link from "next/link"
import { DrupalNode, JsonApiResource } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface DrupalTimestamp {
  time: string
}

export interface DrupalNodeSimplePath extends JsonApiResource {
    drupal_internal__nid: number;
    drupal_internal__vid: number;
    changed: DrupalTimestamp,
    created: DrupalTimestamp,
    title: string;
    default_langcode: boolean;
    sticky: boolean;
    path?: string;
    body?: any;
}

interface NodeArticleTeaserProps {
  node: DrupalNodeSimplePath;
}

export function NodeArticleTeaser({ node, ...props }: NodeArticleTeaserProps) {
  return (
    <article {...props} className="overflow-hidden rounded-md bg-slate-800" >
      
        <div className="aspect-w-3 aspect-h-2">
          <Image
            className="h-full w-full object-cover object-center"
            src={node.image.mediaImage.url}
            width={768}
            height={480}
            alt={node.image.mediaImage.alt} />
        </div>

        <div className="px-3 pt-4 pb-6 text-center">
          <h2 className="text-xl font-semibold">{node.title}</h2>
          <div className="mt-1 text-xs text-gray-400">
            {formatDate(node.created.time)}
          </div>
          <div className="mt-2 text-sm">
            Read article
          </div>
        </div>
      
    </article>
  )
}
