import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"
import { defineConfig, passthroughImageService } from "astro/config"

import vercel from "@astrojs/vercel"

// https://astro.build/config
export default defineConfig({
	image: {
		service: passthroughImageService(),
	},
	i18n: {
		defaultLocale: "en",
		locales: ["es", "en"],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
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
	output: "server",
	adapter: vercel(),
})
