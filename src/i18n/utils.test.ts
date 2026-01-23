import { describe, it, expect } from "vitest"
import { getTranslations } from "@/i18n/utils"

describe("i18n Translations", () => {
	describe("English translations", () => {
		it("should return English translations for en locale", () => {
			const t = getTranslations("en")
			expect(t).toBeDefined()
			expect(typeof t).toBe("function")
		})

		it("should provide navigation translations", () => {
			const t = getTranslations("en")
			expect(t("nav.about")).toBe("Pilot's Log")
			expect(t("nav.experience")).toBe("Mission Log")
			expect(t("nav.skills")).toBe("Arsenal")
			expect(t("nav.contact")).toBe("Contact")
		})

		it("should provide skill translations", () => {
			const t = getTranslations("en")
			// Core skills
			expect(t("skills.core_skills.typescript")).toBe("TypeScript")
			expect(t("skills.core_skills.angular")).toBe("Angular")
			expect(t("skills.core_skills.nextjs")).toBe("Next.js / React")
			expect(t("skills.core_skills.tailwindcss")).toBe("Tailwind CSS")

			// Secondary skills
			expect(t("skills.secondary_skills.figma")).toBe("Figma (UX Expert)")
			expect(t("skills.secondary_skills.nodejs")).toBe("Node.js / Express")

			// Additional skills
			expect(t("skills.additional_skills.docker")).toBe("Docker / Linux")
			expect(t("skills.additional_skills.github")).toBe("GitHub / GitLab")
		})

		it("should provide section titles", () => {
			const t = getTranslations("en")
			expect(t("skills.title")).toBe("Technical Arsenal")
			expect(t("contact.title")).toBe("Establish Comm Link")
			expect(t("about.title")).toBe("The Pilot's Log")
			expect(t("experience.title")).toBe("Mission Log")
		})

		it("should provide common translations", () => {
			const t = getTranslations("en")
			expect(t("common.readMore")).toBe("Read more")
			expect(t("common.loading")).toBe("Loading...")
			expect(t("common.error")).toBe("An error occurred")
			expect(t("common.success")).toBe("Success!")
		})
	})

	describe("Spanish translations", () => {
		it("should return Spanish translations for es locale", () => {
			const t = getTranslations("es")
			expect(t).toBeDefined()
			expect(typeof t).toBe("function")
		})

		it("should provide navigation translations in Spanish", () => {
			const t = getTranslations("es")
			expect(t("nav.about")).toBe("Bitácora")
			expect(t("nav.experience")).toBe("Misiones")
			expect(t("nav.skills")).toBe("Arsenal")
			expect(t("nav.contact")).toBe("Contacto")
		})

		it("should provide skill translations in Spanish", () => {
			const t = getTranslations("es")
			// Core skills
			expect(t("skills.core_skills.typescript")).toBe("TypeScript")
			expect(t("skills.core_skills.angular")).toBe("Angular")
			expect(t("skills.core_skills.nextjs")).toBe("Next.js / React")
			expect(t("skills.core_skills.tailwindcss")).toBe("Tailwind CSS")

			// Secondary skills
			expect(t("skills.secondary_skills.figma")).toBe("Figma (Experto UX)")
			expect(t("skills.secondary_skills.nodejs")).toBe("Node.js / Express")

			// Additional skills
			expect(t("skills.additional_skills.docker")).toBe("Docker / Linux")
			expect(t("skills.additional_skills.github")).toBe("GitHub / GitLab")
		})

		it("should provide section titles in Spanish", () => {
			const t = getTranslations("es")
			expect(t("skills.title")).toBe("Arsenal Técnico")
			expect(t("contact.title")).toBe("Establecer Enlace Comm")
			expect(t("about.title")).toBe("Bitácora del Piloto")
			expect(t("experience.title")).toBe("Registro de Misiones")
		})
	})

	describe("Fallback behavior", () => {
		it("should handle missing keys gracefully", () => {
			const t = getTranslations("en")
			// When a key doesn't exist, the function returns the key itself
			const result = t("nav.home")
			expect(result).toBeDefined()
			expect(typeof result).toBe("string")
		})

		it("should have consistent skill keys across languages", () => {
			const enT = getTranslations("en")
			const esT = getTranslations("es")

			// Core skills should exist in both languages
			expect(enT("skills.core_skills.typescript")).toBe(esT("skills.core_skills.typescript"))
			expect(enT("skills.core_skills.angular")).toBe(esT("skills.core_skills.angular"))
			expect(enT("skills.core_skills.nextjs")).toBe(esT("skills.core_skills.nextjs"))
			expect(enT("skills.core_skills.tailwindcss")).toBe(esT("skills.core_skills.tailwindcss"))
		})

		it("should have same skill categories in both languages", () => {
			const enT = getTranslations("en")
			const esT = getTranslations("es")

			// Check that major sections have consistent structure
			expect(enT("skills.title")).toBeDefined()
			expect(esT("skills.title")).toBeDefined()

			expect(enT("skills.core_skills.typescript")).toBeDefined()
			expect(esT("skills.core_skills.typescript")).toBeDefined()
		})
	})

	describe("About section translations", () => {
		it("should provide about section content in English", () => {
			const t = getTranslations("en")
			expect(t("about.name")).toBe("Cristhofer Pincetti")
			expect(t("about.role")).toBe("Full Stack Engineer")
			expect(t("about.identity")).toBe("Identity")
		})

		it("should provide about section content in Spanish", () => {
			const t = getTranslations("es")
			expect(t("about.name")).toBe("Cristhofer Pincetti")
			expect(t("about.role")).toBe("Ingeniero Full Stack")
			expect(t("about.identity")).toBe("Identidad")
		})
	})

	describe("Contact form translations", () => {
		it("should provide contact form labels in English", () => {
			const t = getTranslations("en")
			expect(t("contact.form.senderId")).toBe("Sender ID")
			expect(t("contact.form.frequency")).toBe("Frequency")
			expect(t("contact.form.transmission")).toBe("Transmission")
		})

		it("should provide contact form labels in Spanish", () => {
			const t = getTranslations("es")
			expect(t("contact.form.senderId")).toBe("ID del Remitente")
			expect(t("contact.form.frequency")).toBe("Frecuencia")
			expect(t("contact.form.transmission")).toBe("Transmisión")
		})

		it("should provide contact form validation errors in English", () => {
			const t = getTranslations("en")
			expect(t("contact.error.nameRequired")).toBe("Sender ID is required")
			expect(t("contact.error.emailRequired")).toBe("Frequency is required")
			expect(t("contact.error.messageRequired")).toBe("Transmission payload required")
		})

		it("should provide contact form validation errors in Spanish", () => {
			const t = getTranslations("es")
			expect(t("contact.error.nameRequired")).toBe("Se requiere ID del remitente")
			expect(t("contact.error.emailRequired")).toBe("Se requiere frecuencia")
			expect(t("contact.error.messageRequired")).toBe("Se requiere carga de transmisión")
		})
	})
})
