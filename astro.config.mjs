import mdx from "@astrojs/mdx"
import icon from "astro-icon"
import { defineConfig, passthroughImageService } from "astro/config"

import vercel from "@astrojs/vercel"

import tailwindcss from "@tailwindcss/vite"

import react from "@astrojs/react";

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

    integrations: [mdx(), icon(), react()],

    prefetch: true,

    server: {
        port: 3000,
    },

    output: "server",
    adapter: vercel(),

    vite: {
        plugins: [tailwindcss()],
    },
})