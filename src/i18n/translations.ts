import * as en from "./locales/en";
import * as es from "./locales/es";

export const translations = {
	en,
	es,
} as const;

export const languages = {
	en: "English",
	es: "Spanish",
} as const;

export const defaultLang = "en";

export type Language = keyof typeof translations;
export type TranslationNamespace = keyof typeof en;
