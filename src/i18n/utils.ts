import {
	defaultLang,
	translations,
	type Language,
	type TranslationNamespace,
} from "./translations";

// Enhanced nested path type that shows ALL possible paths in intellisense
type DeepPaths<T, Prefix extends string = ""> = {
	[K in keyof T]: K extends string
		? T[K] extends Record<string, unknown>
			? Prefix extends ""
				? K | DeepPaths<T[K], K>
				: `${Prefix}.${K}` | DeepPaths<T[K], `${Prefix}.${K}`>
			: Prefix extends ""
				? K
				: `${Prefix}.${K}`
		: never;
}[keyof T];

// Generate ALL possible translation paths across ALL namespaces
type AllTranslationPaths = {
	[K in TranslationNamespace]: K | DeepPaths<(typeof translations)[typeof defaultLang][K], K>;
}[TranslationNamespace];

// Helper type to get value at any nested path
type GetDeepValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? GetDeepValue<T[K], Rest>
		: never
	: P extends keyof T
		? T[P]
		: never;

// Type for getting value from any translation path
type GetTranslationFromPath<P extends string> = P extends `${infer Namespace}.${infer Rest}`
	? Namespace extends TranslationNamespace
		? GetDeepValue<(typeof translations)[typeof defaultLang][Namespace], Rest>
		: never
	: P extends TranslationNamespace
		? (typeof translations)[typeof defaultLang][P]
		: never;

export type { Language };

/**
 * Get language from dynamic route params (Astro.params.locale)
 */
export function getLangFromParams(locale: string | undefined): Language {
	if (locale && locale in translations) return locale as Language;
	return defaultLang;
}

/**
 * Get language from URL (for components that don't have access to params)
 */
export function getLangFromUrl(url: URL): Language {
	const [, lang] = url.pathname.split("/");
	if (lang in translations) return lang as Language;
	return defaultLang;
}

/**
 * Create a translation utility for a specific language and namespace
 * This gives you direct access with full autocomplete:
 *
 * const t = useTranslation(lang, 'home')
 * t.hero.title  // Full autocomplete!
 * t.about.name  // Full autocomplete!
 */
export function useTranslation<T extends TranslationNamespace>(
	lang: Language,
	namespace: T,
): (typeof translations)[typeof defaultLang][T] {
	const translation = translations[lang]?.[namespace];
	const fallback = translations[defaultLang][namespace];

	return (translation || fallback) as (typeof translations)[typeof defaultLang][T];
}

/**
 * Get translations function that returns a helper to access translations by path
 *
 * Usage:
 * const t = getTranslations(lang)
 * t("nav.home") // "Home"
 * t("about.title") // "The Pilot's Log"
 */
// eslint-disable-next-line no-unused-vars
export function getTranslations(lang: Language): (path: AllTranslationPaths) => string {
	return (path: AllTranslationPaths): string => {
		const keys = path.split(".");
		const [namespace, ...nestedKeys] = keys;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let value: any = translations[lang]?.[namespace as TranslationNamespace];

		// If not found in current language, fallback to default
		if (!value) {
			value = translations[defaultLang][namespace as TranslationNamespace];
		}

		// Navigate through nested keys
		for (const key of nestedKeys) {
			value = value?.[key];
		}

		return typeof value === "string" ? value : String(value ?? path);
	};
}

/**
 * Get a specific translation path directly
 *
 * Usage:
 * getTranslation(lang, "nav.home") // "Home"
 */
export function getTranslation<P extends AllTranslationPaths>(
	lang: Language,
	path: P,
): GetTranslationFromPath<P> {
	if (path.includes(".")) {
		const keys = path.split(".");
		const [namespace, ...nestedKeys] = keys;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let value: any = translations[lang]?.[namespace as TranslationNamespace];

		if (!value) {
			value = translations[defaultLang][namespace as TranslationNamespace];
		}

		for (const key of nestedKeys) {
			value = value?.[key];
		}

		return value as GetTranslationFromPath<P>;
	} else {
		return useTranslation(lang, path as TranslationNamespace) as GetTranslationFromPath<P>;
	}
}
