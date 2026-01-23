import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@core": path.resolve(__dirname, "./src/core"),
			"@lib": path.resolve(__dirname, "./src/lib"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@public": path.resolve(__dirname, "./public"),
		},
	},
	test: {
		globals: true,
		environment: "happy-dom",
		include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
		exclude: ["node_modules/", "dist/", ".vercel/", "e2e/", "build/"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["node_modules/", "dist/", ".vercel/", "**/*.spec.ts", "**/*.test.ts", "e2e/"],
		},
	},
})
