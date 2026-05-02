import { StorageManager, createStorageKey } from "./storage-manager";

export type Language = "en" | "es";
export type LanguagePreference = Language | "system";

const LANG_KEY = createStorageKey<LanguagePreference>("language-preference");
const LANG_KEY_LEGACY = createStorageKey<string>("lang"); // Legacy key for backwards compatibility

/**
 * Maps language variants to their base language code
 * e.g., "en-US", "en-GB" → "en"; "es-MX", "es-ES" → "es"
 */
const LANGUAGE_VARIANTS: Record<string, Language> = {
	// English variants
	"en-us": "en",
	"en-gb": "en",
	"en-au": "en",
	"en-ca": "en",
	"en-nz": "en",
	"en-ie": "en",
	"en-za": "en",
	"en-in": "en",
	en: "en",

	// Spanish variants
	"es-mx": "es",
	"es-es": "es",
	"es-ar": "es",
	"es-co": "es",
	"es-pe": "es",
	"es-cl": "es",
	"es-ve": "es",
	"es-ec": "es",
	"es-bo": "es",
	"es-py": "es",
	"es-uy": "es",
	"es-gt": "es",
	"es-cu": "es",
	"es-do": "es",
	"es-sv": "es",
	"es-hn": "es",
	"es-ni": "es",
	"es-pa": "es",
	es: "es",
};

/**
 * Parse language variants from Accept-Language header
 * e.g., "en-US,en;q=0.9,es;q=0.8" → "en"
 */
export function parseLanguageFromHeader(acceptLanguage: string | null): Language | null {
	if (!acceptLanguage) return null;

	const languages = acceptLanguage
		.split(",")
		.map((lang) => lang.trim().split(";")[0].toLowerCase());

	for (const lang of languages) {
		const mapped = LANGUAGE_VARIANTS[lang];
		if (mapped) return mapped;
	}

	return null;
}

/**
 * Get the system language preference from browser
 */
export function getSystemLanguage(): Language {
	if (typeof navigator === "undefined") return "en";

	const browserLang = navigator.language.toLowerCase();
	return LANGUAGE_VARIANTS[browserLang] || "en";
}

/**
 * Extract language from current URL path
 * e.g., "/en/about" → "en", "/es/skills" → "es"
 */
export function extractLanguageFromPath(pathname: string): Language | null {
	const match = pathname.match(/^\/(en|es)\//);
	return match?.[1] as Language | null;
}

/**
 * Determine the effective language based on preference hierarchy
 * 1. Stored preference (if "en" or "es", not "system")
 * 2. Current URL path
 * 3. System preference
 * 4. Default to "en"
 */
export function resolveLanguage(
	urlPath: string,
	storedPreference?: LanguagePreference | null,
): Language {
	// If stored preference is a concrete language (not "system"), use it
	if (storedPreference === "en" || storedPreference === "es") {
		return storedPreference;
	}

	// Try to get from URL
	const urlLang = extractLanguageFromPath(urlPath);
	if (urlLang) return urlLang;

	// Fall back to system preference
	return getSystemLanguage();
}

/**
 * Get the current language preference
 */
export function getLanguagePreference(): LanguagePreference | null {
	if (typeof window === "undefined") return null;

	// Try new key first
	let stored = StorageManager.get<string>(LANG_KEY) as string | null;

	// Fall back to legacy key if new key not found
	if (!stored) {
		stored = StorageManager.get<string>(LANG_KEY_LEGACY) as string | null;
	}

	if (!stored) return null;

	// Normalize the value
	const normalized = stored.toLowerCase().trim();
	if (normalized === "en" || normalized === "es" || normalized === "system") {
		return normalized as LanguagePreference;
	}
	return null;
}

/**
 * Set the language preference
 */
export function setLanguagePreference(preference: LanguagePreference): void {
	if (typeof window === "undefined") return;
	StorageManager.set(LANG_KEY, preference);
	// Also clear legacy key to avoid confusion
	StorageManager.remove(LANG_KEY_LEGACY);
}

export const languageManager = {
	parseLanguageFromHeader,
	getSystemLanguage,
	extractLanguageFromPath,
	resolveLanguage,
	getLanguagePreference,
	setLanguagePreference,
	LANG_KEY,
};
