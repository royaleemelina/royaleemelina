/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'your-domain.com',  // replace with your actual domain
          port: '',
          pathname: '/**',
        },
      ],
    },
    // Add modern optimizations
    reactStrictMode: true,
    swcMinify: true,
    // Improve performance
    poweredByHeader: false,
    // Add webpack configuration to handle some deprecated packages
    webpack: (config, { isServer }) => {
      // Future webpack 5 configuration here if needed
      return config
    },
  }
  
  module.exports = nextConfig 