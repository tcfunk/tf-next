/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
