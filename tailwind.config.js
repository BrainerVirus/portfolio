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
				"primary-dark": "rgba(var(--primary-dark), <alpha-value>)",
				"primary-darker": "rgba(var(--primary-darker), <alpha-value>)",
				"primary-light": "rgba(var(--primary-light), <alpha-value>)",
				"primary-lighter": "rgba(var(--primary-lighter), <alpha-value>)",
				"primary-tone": "rgba(var(--primary-tone), <alpha-value>)",
				"primary-tone-light": "rgba(var(--primary-tone-light), <alpha-value>)",
				"boxShadow": {
					primary: "0px 5px 5px 0px rgba(var(--shadow-primary))",
					secondary: "0px 2px 5px 0px rgba(var(--shadow-secondary))",
				},
				"borderRadius": {
					"btn-xs": "var(--rounded-btn-xs)",
					"btn-sm": "var(--rounded-btn-sm)",
					"btn-md": "var(--rounded-btn-md)",
					"btn-lg": "var(--rounded-btn-lg)",
					"box-sm": "var(--rounded-box-sm)",
					"box-md": "var(--rounded-box-md)",
					"box-lg": "var(--rounded-box-lg)",
				},
				"fontWeight": {
					inherit: "inherit",
				},
				"transitionTimingFunction": {
					"ease-out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
					"ease-in-and-out-back": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
				},
			},
		},
	},
	daisyui: {
		themes: [
			{
				twinkling_stars: {
					// Daisy UI theme variables
					"primary": "#8b21c4",
					"primary-content": "#FFFFFF",
					"secondary": "#f0f0f0",
					"secondary-content": "#414756",
					"accent": "#ff9900",
					"accent-content": "#FFFFFF",
					"neutral": "#414756",
					"neutral-content": "#FFFFFF",
					"base-100": "#FFFFFF",
					"base-200": "#f6f6f6",
					"base-300": "#e0e0e0",
					"base-content": "#1F2937",
					"info": "#4DD6ED",
					"info-content": "#FFFFFF",
					"success": "#4DD192",
					"success-content": "#FFFFFF",
					"warning": "#DBD46C",
					"warning-content": "#414756",
					"error": "#E72F40",
					"error-content": "#FFFFFF",
					// Custom colors
					"--primary-dark": "104, 23, 153",
					"--primary-darker": "69, 18, 100",
					"--primary-light": "179, 54,217",
					"--primary-lighter": "214,86, 244",
					"--primary-tone": "162, 44, 185",
					"--primary-tone-light": "196, 70, 226",
					"--shadow-primary": "77, 190, 209,  0.7",
					"--shadow-secondary": "186, 185, 185, 0.40",
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
					// Custom utility variables
					"--rounded-btn-xs": "0.3rem", // 4.8px
					"--rounded-btn-sm": "0.5rem", // 8px
					"--rounded-btn-md": "0.813rem", // 13px
					"--rounded-btn-lg": "2.25rem", // 36px
					"--rounded-box-sm": "0.5rem", // 8px
					"--rounded-box-md": "0.813rem", // 13px
					"--rounded-box-lg": "2.25rem", // 36px
				},
			},
		],
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
