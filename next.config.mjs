/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http' || 'https', // Allow both http and https (optional)
            hostname: 'uploadthing.com',
          },
          {
            protocol: 'http' || 'https', // Allow both http and https (optional)
            hostname: 'utfs.io',
          },
          {
            protocol: 'http' || 'https', // Allow both http and https (optional)
            hostname: 'img.clerk.com',
          },
          {
            protocol: 'http' || 'https', // Allow both http and https (optional)
            hostname: 'subdomain',
          },
          {
            protocol: 'http' || 'https', // Allow both http and https (optional)
            hostname: 'files.stripe.com',
          },
        ],
      },
      reactStrictMode: false,
};

export default nextConfig;
