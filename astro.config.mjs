import mdx from "@astrojs/mdx"
import icon from "astro-icon"
import { defineConfig, fontProviders, passthroughImageService } from "astro/config"

import vercel from "@astrojs/vercel"

import tailwindcss from "@tailwindcss/vite"

import react from "@astrojs/react"

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

	integrations: [mdx(), icon({
		include: {
			devicon: [
				"typescript",
				"angular",
				"nextjs",
				"react",
				"nodejs",
				"figma",
				"prisma",
				"javascript",
				"docker",
				"github",
				"socketio",
				"python",
				"tailwindcss",
				"electron",
			],
			mdi: ["nature-people", "head-lightbulb", "brain", "chat", "dumbbell"],
		},
	}), react()],

	prefetch: true,

	server: {
		port: 3000,
	},

	fonts: [{
		provider: fontProviders.fontshare(),
		name: "Satoshi",
		cssVariable: "--font-satoshi",
		weights: [300, 400, 500, 700],
		styles: ["normal"],
		subsets: ["latin"],
		fallbacks: ["system-ui", "sans-serif"],
	}, {
		provider: fontProviders.fontsource(),
		name: "JetBrains Mono",
		cssVariable: "--font-mono",
		weights: [400, 500],
		styles: ["normal", "italic"],
		subsets: ["latin"],
		fallbacks: ["ui-monospace", "monospace"],
	}, {
		provider: fontProviders.googleicons(),
		name: "Material Symbols Outlined",
		cssVariable: "--font-material-symbols",
		weights: ["100 700"],
		styles: ["normal"],
		subsets: ["latin"],
		fallbacks: [],
	}],

	output: "server",
	adapter: vercel(),

	vite: {
		plugins: [tailwindcss()],
	},
})