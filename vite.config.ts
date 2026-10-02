import tailwindcss from "@tailwindcss/vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				autoSubfolderIndex: true,
				crawlLinks: true,
				failOnError: true,
				// Skip static assets the crawler discovers (e.g. /titanic-cv.pdf)
				filter: ({ path }) => !/\.(pdf|png|xml|txt|ico)$/.test(path),
			},
			pages: [
				{ path: "/", prerender: { enabled: true } },
				{
					path: "/projects/private-movie",
					prerender: { enabled: true },
				},
				{
					path: "/404",
					prerender: { enabled: true, outputPath: "/404.html" },
				},
			],
		}),
		viteReact(),
	],
});

export default config;
