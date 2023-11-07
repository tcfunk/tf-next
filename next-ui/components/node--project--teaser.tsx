import Image from "next/image"
import Link from "next/link"
import { DrupalNodeSimplePath } from "./node--article--teaser";
import ItchLogo from "./itch-logo";
import GradientText from "./gradient-text";

interface NodeProjectTeaserProps {
  node: DrupalNodeSimplePath
}

export function NodeProjectTeaser({ node, ...props }: NodeProjectTeaserProps) {
  return (
    <div className="flex flex-col items-center gap-x-8 overflow-hidden rounded-md bg-slate-800 md:flex-row">
      <div className="shrink-0">
        <Link href={node.path}>
          <Image
            src={node.coverGif.mediaGif.url}
            alt={node.coverGif.mediaGif.alt}
            height={node.coverGif.mediaGif.height}
            width={node.coverGif.mediaGif.width}
            suppressHydrationWarning />
        </Link>
      </div>
      <div>
        <div className="flex flex-col items-center gap-y-2 md:flex-row">
          <Link href={node.path} className="text-2xl font-semibold transition-colors hover:text-cyan-400">{node.title}</Link>
          <div className="ml-3 flex gap-2">
            {node.linkSteam && (
              <div className="px-2 py-1 text-xs font-semibold">
                  <Link href={node.linkSteam.url} target="_blank" rel="external">
                    <Image
                      src="https://partner.steamgames.com/public/images/steam_logo_white_small.png"
                      alt="Steam store page"
                      height="20"
                      width="60" />
                  </Link>
              </div>
            )}
            {node.linkItch && (
              <div className="px-2 py-1 text-xs font-semibold">
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