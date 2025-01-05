/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
        exclude: ["error"],
    },
    transpilePackages: ["mui-chips-input"],
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_PROTOCOL || "http",
                hostname: process.env.NEXT_PUBLIC_HOSTNAME || "",
                port: process.env.NEXT_PUBLIC_API_PORT || "",
                pathname: "/uploads/**",
            },
        ],
    },
};

export default nextConfig;
