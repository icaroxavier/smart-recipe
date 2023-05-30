/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate-plugin')

const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    return config
  },
}

module.exports = nextTranslate(nextConfig)
