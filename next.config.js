/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Projects used to live in a tab on /work. Keep old links working.
      { source: "/work/projects", destination: "/projects", permanent: true },
    ];
  },
};

module.exports = nextConfig;
