import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/',
        permanent: true,
      },
       {
        source: '/wb',
        destination: '/',
        permanent: true,
      },
       {
        source: '/wb-admin',
        destination: '/',
        permanent: true,
      },
       {
        source: '/system',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
