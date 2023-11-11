import Image from "next/image"

export default function SocialIcon({ icon }) {
  return (
    <Image
      className="h-12 w-12 hover:translate-y-1"
      src={icon}
      width={246}
      height={246}
      alt={"social icon " + icon}
      loading="lazy" />
  )
}