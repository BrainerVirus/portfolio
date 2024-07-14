import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"
import { defineConfig } from "astro/config"

import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		mdx(),
		icon(),
	],
	prefetch: true,
	server: {
		port: 3000,
	},
	output: "hybrid",
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
		maxDuration: 8,
		imageService: true,
		devImageService: "squoosh",
		isr: {
			expiration: 60 * 60 * 24,
		},
	}),
})
