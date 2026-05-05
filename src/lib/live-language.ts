import gsap from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { defaultLang, translations, type Language } from "@/i18n/translations"

gsap.registerPlugin(ScrambleTextPlugin)

export type { Language }

export type LanguagePreference = Language | "system"

export interface LiveLanguageDetail {
	language: Language
	preference: LanguagePreference
	translations: (typeof translations)[Language]
}

export const languageChangeEvent = "portfolio:language-change"

const preferenceKey = "portfolio:language-preference"
const supportedLanguages = Object.keys(translations) as Language[]
const scrambleChars = "01<>/{}[]"

function isLanguage(value: string | null | undefined): value is Language {
	return Boolean(value && supportedLanguages.includes(value as Language))
}

function isPreference(value: string | null | undefined): value is LanguagePreference {
	return value === "system" || isLanguage(value)
}

function getCookie(name: string): string | null {
	const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))

	return match ? decodeURIComponent(match.split("=")[1] || "") : null
}

function setCookiePreference(preference: LanguagePreference) {
	if (preference === "system") {
		document.cookie = "lang=; path=/; max-age=0; SameSite=Lax"
		return
	}

	document.cookie = `lang=${preference}; path=/; max-age=31536000; SameSite=Lax`
}

export function getSystemLanguage(): Language {
	const browserLanguage = navigator.language?.split("-")[0]
	return isLanguage(browserLanguage) ? browserLanguage : defaultLang
}

export function resolveLanguagePreference(preference: LanguagePreference): Language {
	return preference === "system" ? getSystemLanguage() : preference
}

export function getLanguagePreference(): LanguagePreference {
	return getSavedLanguagePreference() ?? "system"
}

function getSavedLanguagePreference(): LanguagePreference | null {
	const storedPreference = localStorage.getItem(preferenceKey)
	if (isPreference(storedPreference)) return storedPreference

	const cookiePreference = getCookie("lang")
	if (isLanguage(cookiePreference)) return cookiePreference

	return null
}

export function getCurrentLanguage(): Language {
	const documentLanguage = document.documentElement.lang?.split("-")[0]
	if (isLanguage(documentLanguage)) return documentLanguage

	const routeLanguage = window.location.pathname.split("/").filter(Boolean)[0]
	if (isLanguage(routeLanguage)) return routeLanguage

	return resolveLanguagePreference(getLanguagePreference())
}

export function getTranslation(lang: Language, path: string): string {
	const keys = path.split(".")
	let value: unknown = translations[lang]
	let fallback: unknown = translations[defaultLang]

	for (const key of keys) {
		value = Array.isArray(value)
			? value[Number(key)]
			: value && typeof value === "object"
				? (value as Record<string, unknown>)[key]
				: undefined
		fallback = Array.isArray(fallback)
			? fallback[Number(key)]
			: fallback && typeof fallback === "object"
				? (fallback as Record<string, unknown>)[key]
				: undefined
	}

	return typeof value === "string" ? value : typeof fallback === "string" ? fallback : path
}

export function getContactFormTranslations(lang: Language) {
	return {
		name: getTranslation(lang, "contact.form.name"),
		namePlaceholder: getTranslation(lang, "contact.form.namePlaceholder"),
		email: getTranslation(lang, "contact.form.email"),
		emailPlaceholder: getTranslation(lang, "contact.form.emailPlaceholder"),
		message: getTranslation(lang, "contact.form.message"),
		messagePlaceholder: getTranslation(lang, "contact.form.messagePlaceholder"),
		submit: getTranslation(lang, "contact.form.submit"),
		sending: getTranslation(lang, "contact.messages.transmitting"),
		error: {
			nameRequired: getTranslation(lang, "contact.error.nameRequired"),
			emailRequired: getTranslation(lang, "contact.error.emailRequired"),
			emailInvalid: getTranslation(lang, "contact.error.emailInvalid"),
			messageRequired: getTranslation(lang, "contact.error.messageRequired"),
			messageMinLength: getTranslation(lang, "contact.error.messageMinLength"),
		},
		success: getTranslation(lang, "contact.messages.success"),
		failed: getTranslation(lang, "contact.messages.failed"),
		connectionLost: getTranslation(lang, "contact.messages.connectionLost"),
	}
}

function formatAttributeName(datasetKey: string): string {
	return datasetKey
		.replace(/^i18n/, "")
		.replace(/[A-Z]/g, (letter, index) => `${index === 0 ? "" : "-"}${letter.toLowerCase()}`)
}

function mutateText(element: HTMLElement, text: string, animate: boolean) {
	if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		element.textContent = text
		return
	}

	gsap.to(element, {
		duration: Math.min(0.55, Math.max(0.25, text.length * 0.012)),
		scrambleText: {
			text,
			chars: scrambleChars,
			revealDelay: 0,
			speed: 0.75,
		},
		ease: "none",
		overwrite: true,
	})
}

function mutateDom(language: Language, animate: boolean) {
	const title = getTranslation(language, "meta.home.title")
	document.title = title
	document.documentElement.lang = language

	document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
		const key = element.dataset.i18n
		if (!key) return
		mutateText(element, getTranslation(language, key), animate)
	})

	document.querySelectorAll<HTMLElement>("[data-i18n-attr]").forEach((element) => {
		const attrMap = element.dataset.i18nAttr
		if (!attrMap) return

		attrMap.split(";").forEach((pair) => {
			const [attribute, key] = pair.split(":")
			if (!attribute || !key) return
			element.setAttribute(attribute.trim(), getTranslation(language, key.trim()))
		})
	})

	document
		.querySelectorAll<HTMLElement>(
			"[data-i18n-aria-label], [data-i18n-placeholder], [data-i18n-title], [data-i18n-data-skill-name]"
		)
		.forEach((element) => {
			Object.entries(element.dataset).forEach(([datasetKey, key]) => {
				if (!datasetKey.startsWith("i18n") || datasetKey === "i18n" || datasetKey === "i18nAttr") {
					return
				}
				if (!key) return

				element.setAttribute(formatAttributeName(datasetKey), getTranslation(language, key))
			})
		})
}

export function applyLanguagePreference(
	preference: LanguagePreference,
	options: { animate?: boolean } = {}
) {
	const scrollX = window.scrollX
	const scrollY = window.scrollY
	localStorage.setItem(preferenceKey, preference)
	setCookiePreference(preference)

	const language = resolveLanguagePreference(preference)
	const animate = options.animate ?? true
	mutateDom(language, animate)

	const detail: LiveLanguageDetail = {
		language,
		preference,
		translations: translations[language],
	}

	document.dispatchEvent(new CustomEvent<LiveLanguageDetail>(languageChangeEvent, { detail }))

	const restoreScroll = () => window.scrollTo(scrollX, scrollY)
	restoreScroll()
	window.requestAnimationFrame(restoreScroll)
	for (const delay of [80, 240, 560, 820]) {
		window.setTimeout(restoreScroll, delay)
	}
}

export function initLiveLanguage() {
	const savedPreference = getSavedLanguagePreference()
	if (savedPreference) {
		applyLanguagePreference(savedPreference, { animate: false })
		return
	}

	const language = getCurrentLanguage()
	mutateDom(language, false)
	document.dispatchEvent(
		new CustomEvent<LiveLanguageDetail>(languageChangeEvent, {
			detail: {
				language,
				preference: "system",
				translations: translations[language],
			},
		})
	)
}
