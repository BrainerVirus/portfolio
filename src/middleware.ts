import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware((context, next) => {
	const { request } = context
	const acceptLanguage = request.headers.get("accept-language")
	const languageWithCountry = acceptLanguage?.split(",")[0]
	const lang = languageWithCountry?.split("-")[0]

	// Get the current path
	const currentPath = new URL(request.url).pathname

	// Redirect based on detected language
	if (lang === "en" && currentPath !== "/en/") {
		return context.redirect("/en/", 302)
	} else if (lang === "es" && currentPath !== "/es/") {
		return context.redirect("/es/", 302)
	} else if (!lang && currentPath !== "/en/") {
		return context.redirect("/en/", 302)
	} else if (lang !== "es" && lang !== "en" && currentPath !== "/en/") {
		return context.redirect("/en/", 302)
	}

	// Call next middleware if no redirection occurs
	return next()
})
