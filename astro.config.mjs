import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"
import { defineConfig } from "astro/config"

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
	output: "static",
})
