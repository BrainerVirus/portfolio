/** @type {import('tailwindcss').Config} */

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				"source-sans-pro": ["Source Sans", "Arial", "Helvetica", "sans-serif"],
				"heading": ["Source Sans", "Arial", "Helvetica", "sans-serif"],
				"body": ["Source Sans", "Arial", "Helvetica", "sans-serif"],
			},
			colors: {
				"tertiary": "rgba(var(--tertiary), <alpha-value>)",
				"tertiary-content": "rgba(var(--tertiary-content), <alpha-value>)",
				"neutral-secondary": "rgba(var(--neutral-secondary),  <alpha-value>)",
				"base-placeholder": "rgba(var(--base-placeholder), <alpha-value>)",
			},
			boxShadow: {
				main: "0px 0px 8px 0px rgba(var(--shadow-primary))",
			},
			fontWeight: {
				inherit: "inherit",
			},
			transitionTimingFunction: {
				"ease-out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
				"ease-in-and-out-back": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
			},
		},
	},
	daisyui: {
		themes: [
			{
				twinkling_stars: {
					// Daisy UI theme variables
					"primary": "#B224FF",
					"primary-content": "#FFFFFF",
					"secondary": "#5D5F69",
					"secondary-content": "#FFFFFF",
					"accent": "#ff9900",
					"accent-content": "#FFFFFF",
					"neutral": "#616161",
					"neutral-content": "#FFFFFF",
					"base-100": "#121212",
					"base-200": "#1e1e1e",
					"base-300": "#320051",
					"base-content": "#FFFFFF",
					"info": "#4DD6ED",
					"info-content": "#FFFFFF",
					"success": "#4DD192",
					"success-content": "#FFFFFF",
					"warning": "#DBD46C",
					"warning-content": "#414756",
					"error": "#E72F40",
					"error-content": "#FFFFFF",
					// Custom colors
					"--tertiary": "161, 161, 161",
					"--tertiary-content": "55, 56, 62",
					"--neutral-secondary": "169, 170, 178",
					"--neutral-secondary-content": "255, 255, 255",
					"--base-placeholder": "178, 179, 81",
					"--shadow-primary": "0, 0, 0,  0.40",
					// Daisy UI utility variables
					"--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
					"--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
					"--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
					"--animation-btn": "0.25s", // duration of animation when you click on button
					"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
					"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
					"--border-btn": "1px", // border width of buttons
					"--tab-border": "1px", // border width of tabs
					"--tab-radius": "0.5rem", // border radius of tabs
				},
			},
		],
	},
	plugins: [
		require("@midudev/tailwind-animations"),
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
}
