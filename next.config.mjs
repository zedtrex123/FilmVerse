import nextPwa from "next-pwa"
 
const withPWA = nextPwa({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default withPWA(nextConfig);
