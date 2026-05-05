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
			expect(t("nav.about")).toBe("About")
			expect(t("nav.experience")).toBe("Work")
			expect(t("nav.skills")).toBe("Skills")
			expect(t("nav.contact")).toBe("Contact")
		})

		it("should provide skill translations", () => {
			const t = getTranslations("en")
			// Core skills
			expect(t("skills.core_skills.typescript")).toBe("TypeScript")
			expect(t("skills.core_skills.javascript")).toBe("JavaScript")
			expect(t("skills.core_skills.angular")).toBe("Angular")
			expect(t("skills.core_skills.react")).toBe("React")
			expect(t("skills.core_skills.nextjs")).toBe("Next.js")
			expect(t("skills.core_skills.tailwindcss")).toBe("Tailwind CSS")

			// Secondary skills
			expect(t("skills.secondary_skills.nodejs")).toBe("Node.js")
			expect(t("skills.secondary_skills.express")).toBe("Express")

			// Additional skills
			expect(t("skills.additional_skills.docker")).toBe("Docker")
			expect(t("skills.additional_skills.linux")).toBe("Linux")
			expect(t("skills.additional_skills.github")).toBe("GitHub")
			expect(t("skills.additional_skills.gitlab")).toBe("GitLab")
		})

		it("should provide section titles", () => {
			const t = getTranslations("en")
			expect(t("skills.title")).toBe("Skills")
			expect(t("contact.title")).toBe("Contact")
			expect(t("about.title")).toBe("")
			expect(t("experience.title")).toBe("Work")
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
			expect(t("nav.about")).toBe("Sobre mí")
			expect(t("nav.experience")).toBe("Trabajo")
			expect(t("nav.skills")).toBe("Habilidades")
			expect(t("nav.contact")).toBe("Contacto")
		})

		it("should provide skill translations in Spanish", () => {
			const t = getTranslations("es")
			// Core skills
			expect(t("skills.core_skills.typescript")).toBe("TypeScript")
			expect(t("skills.core_skills.javascript")).toBe("JavaScript")
			expect(t("skills.core_skills.angular")).toBe("Angular")
			expect(t("skills.core_skills.react")).toBe("React")
			expect(t("skills.core_skills.nextjs")).toBe("Next.js")
			expect(t("skills.core_skills.tailwindcss")).toBe("Tailwind CSS")

			// Secondary skills
			expect(t("skills.secondary_skills.nodejs")).toBe("Node.js")
			expect(t("skills.secondary_skills.express")).toBe("Express")

			// Additional skills
			expect(t("skills.additional_skills.docker")).toBe("Docker")
			expect(t("skills.additional_skills.linux")).toBe("Linux")
			expect(t("skills.additional_skills.github")).toBe("GitHub")
			expect(t("skills.additional_skills.gitlab")).toBe("GitLab")
		})

		it("should provide section titles in Spanish", () => {
			const t = getTranslations("es")
			expect(t("skills.title")).toBe("Habilidades")
			expect(t("contact.title")).toBe("Contacto")
			expect(t("about.title")).toBe("")
			expect(t("experience.title")).toBe("Trabajo")
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
			expect(enT("skills.core_skills.javascript")).toBe(esT("skills.core_skills.javascript"))
			expect(enT("skills.core_skills.angular")).toBe(esT("skills.core_skills.angular"))
			expect(enT("skills.core_skills.react")).toBe(esT("skills.core_skills.react"))
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
			expect(t("about.role")).toBe("Software Engineer")
			expect(t("about.identity")).toBe("Identity")
		})

		it("should provide about section content in Spanish", () => {
			const t = getTranslations("es")
			expect(t("about.name")).toBe("Cristhofer Pincetti")
			expect(t("about.role")).toBe("Ingeniero de Software")
			expect(t("about.identity")).toBe("Identidad")
		})
	})

	describe("Contact form translations", () => {
		it("should provide contact form labels in English", () => {
			const t = getTranslations("en")
			expect(t("contact.form.name")).toBe("Name")
			expect(t("contact.form.email")).toBe("Email")
			expect(t("contact.form.message")).toBe("Message")
		})

		it("should provide contact form labels in Spanish", () => {
			const t = getTranslations("es")
			expect(t("contact.form.name")).toBe("Nombre")
			expect(t("contact.form.email")).toBe("Email")
			expect(t("contact.form.message")).toBe("Mensaje")
		})

		it("should provide contact form validation errors in English", () => {
			const t = getTranslations("en")
			expect(t("contact.error.nameRequired")).toBe("Name is required")
			expect(t("contact.error.emailRequired")).toBe("Email is required")
			expect(t("contact.error.messageRequired")).toBe("Message is required")
		})

		it("should provide contact form validation errors in Spanish", () => {
			const t = getTranslations("es")
			expect(t("contact.error.nameRequired")).toBe("El nombre es requerido")
			expect(t("contact.error.emailRequired")).toBe("El email es requerido")
			expect(t("contact.error.messageRequired")).toBe("El mensaje es requerido")
		})
	})
})
