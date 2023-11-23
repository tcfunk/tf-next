import Image from "next/image"
import GradientText from "./gradient-text"
import SocialIcon from "./social-icon"
import Link from "next/link"
import { GetStaticPropsResult } from "next"

interface SocialLink {
  url: URL;
  icon: String;
}

interface HomepageHeroProps {
  socialLinks: SocialLink[];
}

const heroProps: HomepageHeroProps = {socialLinks: [
  {
    url: new URL("https://twitter.com/Furtive_Games"),
    icon: "/icons/x.png"
  },
  {
    url: new URL("https://twitter.com/Furtive_Games"),
    icon: "/icons/fb.png"
  },
  {
    url: new URL("https://twitter.com/Furtive_Games"),
    icon: "/icons/li.png"
  },
  {
    url: new URL("https://twitter.com/Furtive_Games"),
    icon: "/icons/yt.png"
  },
]}

export default function HomepageHero() {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-x-24">
      <div>
        <h1 className="text-3xl font-bold">Hi there, I&apos;m <GradientText>Tyler</GradientText> 👋</h1>
        <p className="mt-6 text-xl leading-9">I&apos;m a parent, a creator, a biker. The hardest thing is trying to live up to one&apos;s own expectations.</p>
        <div className="mt-3 flex gap-1">
          {heroProps.socialLinks.map((socialLink, i) => (
            <Link id={i.toString()} href={socialLink.url}>
              <SocialIcon icon={socialLink.icon} />
            </Link>
          ))}
        </div>
      </div>
      <div className="shrink-0">
        <Image
          className="rounded-3xl w-64"
          src="/me.png"
          width={756}
          height={1008}
          alt="Avatar image"
          loading="lazy" />
      </div>
    </div>
  )
}
