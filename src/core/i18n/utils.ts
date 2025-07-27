import { defaultLang, translations, type Language, type TranslationNamespace } from "./translations"

/**
 * Get language from dynamic route params (Astro.params.locale)
 */
export function getLangFromParams(locale: string | undefined): Language {
	if (locale && locale in translations) return locale as Language
	return defaultLang
}

/**
 * Get language from URL (for components that don't have access to params)
 */
export function getLangFromUrl(url: URL): Language {
	const [, lang] = url.pathname.split("/")
	if (lang in translations) return lang as Language
	return defaultLang
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
	namespace: T
): (typeof translations)[typeof defaultLang][T] {
	const translation = translations[lang]?.[namespace]
	const fallback = translations[defaultLang][namespace]

	return (translation || fallback) as (typeof translations)[typeof defaultLang][T]
}

/**
 * Get specific namespace translations - even more direct!
 *
 * const home = getTranslations(lang, 'home')
 * home.hero.title    // Perfect autocomplete
 * home.about.name    // Perfect autocomplete
 */
export function getTranslations<T extends TranslationNamespace>(
	lang: Language,
	namespace: T
): (typeof translations)[typeof defaultLang][T] {
	return useTranslation(lang, namespace)
}

/**
 * Legacy dot notation support (if you still want it)
 */
export function useTranslations(lang: Language) {
	return function t(key: string): string {
		const keys = key.split(".")
		const [namespace, ...path] = keys

		if (namespace in translations[lang]) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let value: any = translations[lang][namespace as TranslationNamespace]

			for (const k of path) {
				value = value?.[k]
			}

			if (value === undefined) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				value = translations[defaultLang][namespace as TranslationNamespace] as any
				for (const k of path) {
					value = value?.[k]
				}
			}

			return value || key
		}

		return key
	}
}
