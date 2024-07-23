/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				"source-sans-pro": ["Source Sans", "Arial", "Helvetica", "sans-serif"],
				"heading": ["Source Sans", "Arial", "Helvetica", "sans-serif"],
				"body": ["Source Sans", "Arial", "Helvetica", "sans-serif"],
			},
			colors: {
				text: {
					primary: "#f0f8ff",
					foreground: "",
				},
				background: "#141416",
				foreground: "",
				primary: {
					DEFAULT: "#f0f8ff",
					foreground: "#141416",
				},
				secondary: {
					DEFAULT: "hsl(57.2, 95.1%, 48.2%)",
					foreground: "",
				},
				muted: {
					DEFAULT: "",
					foreground: "",
				},
				accent: {
					DEFAULT: "hsl(279, 71%, 45%)",
					foreground: "",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
