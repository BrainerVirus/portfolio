import { parseLanguageFromHeader } from "@/lib/language-manager";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
	const { request } = context;
	const acceptLanguage = request.headers.get("accept-language");

	// Get the current path
	const currentPath = new URL(request.url).pathname;

	// Bypass redirects for non-GET requests (e.g., POST /api/*) and for API/assets
	const isNonGet = request.method !== "GET";
	const isApi = currentPath.startsWith("/api/");
	const isAstroInternal = currentPath.startsWith("/_astro") || currentPath.startsWith("/_image");
	const looksLikeAsset = /\.[a-zA-Z0-9]+$/.test(currentPath);
	if (isNonGet || isApi || isAstroInternal || looksLikeAsset) {
		return next();
	}

	// Honor persisted language cookie if present
	const cookieLang = context.cookies.get("lang")?.value;
	const preferred =
		cookieLang === "es" || cookieLang === "en"
			? cookieLang
			: parseLanguageFromHeader(acceptLanguage);
	const targetLang = preferred ?? "en";

	// Redirect based on detected language
	if (targetLang === "en" && !currentPath.startsWith("/en/")) {
		return context.redirect("/en/", 302);
	} else if (targetLang === "es" && !currentPath.startsWith("/es/")) {
		return context.redirect("/es/", 302);
	}

	// Call next middleware if no redirection occurs
	return next();
});
