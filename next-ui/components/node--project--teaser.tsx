import Image from "next/image"
import Link from "next/link"
import { DrupalNodeSimplePath } from "./node--article--teaser";
import ItchLogo from "./itch-logo";
import SteamLogo from "./steam-logo";

interface NodeProjectTeaserProps {
  node: DrupalNodeSimplePath
}

export function NodeProjectTeaser({ node, ...props }: NodeProjectTeaserProps) {
  return (
    <div className="flex flex-col md:items-center items-stretch gap-x-8 overflow-hidden rounded-md bg-zinc-800 md:flex-row">
      <div className="shrink-0">
        <Link href={node.path}>
          <Image
            className="h-full w-full md:h-auto md:w-auto object-cover md:object-none object-center"
            src={node.coverGif.mediaGif.url}
            alt={node.coverGif.mediaGif.alt}
            height={node.coverGif.mediaGif.height}
            width={node.coverGif.mediaGif.width}
            suppressHydrationWarning />
        </Link>
      </div>
      <div className="m-8">
        <div className="flex flex-col items-center gap-y-2 md:flex-row">
          <Link href={node.path} className="text-4xl transition-colors hover:text-amber-400 font-serif">{node.title}</Link>
          <div className="ml-3 flex gap-2">
            {node.linkSteam && (
              <div className="px-2 py-1">
                  <Link href={node.linkSteam.url} target="_blank" rel="external" className="text-white hover:text-cyan-500">
                    <SteamLogo />
                  </Link>
              </div>
            )}
            {node.linkItch && (
              <div className="px-2 py-1">
                <Link href={node.linkItch.url} target="_blank" rel="external">
                  <ItchLogo />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 text-gray-400">
          {node.body.summary}
        </div>
      </div>
    </div>
  )
}