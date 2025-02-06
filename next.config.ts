import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.themealdb.com",
				pathname: "/images/**",
			},
		],
	},
};

export default nextConfig;
