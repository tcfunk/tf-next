/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      process.env.NEXT_IMAGE_DOMAIN,
      "partner.steamgames.com",
      "tf-next.lndo.site",
    ],
  },
}

module.exports = nextConfig
