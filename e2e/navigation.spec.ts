import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
	})

	test("nav links scroll to correct sections", async ({ page }) => {
		const nav = page.locator("#desktop-nav")

		// Click Experience
		await nav.locator('a[href="#experience"]').click()
		await page.waitForTimeout(800)
		await expect(page.locator("#experience")).toBeInViewport()

		// Click Contact
		await nav.locator('a[href="#contact"]').click()
		await page.waitForTimeout(800)
		await expect(page.locator("#contact")).toBeInViewport()
	})

	test("active state updates on scroll to each section", async ({ page }) => {
		// Scroll through each section and verify the active link changes
		const sections = ["about", "experience", "skills", "contact"]

		for (const sectionId of sections) {
			await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded()
			await page.waitForTimeout(600)

			const link = page.locator(`#desktop-nav a[href="#${sectionId}"]`)
			const color = await link.evaluate((el) => window.getComputedStyle(el).color)
			expect(color).toContain("240, 230, 210") // #f0e6d2 = active/white
		}
	})

	test("skills nav link resolves to #skills section", async ({ page }) => {
		await page.locator('#desktop-nav a[href="#skills"]').click()
		await page.waitForTimeout(800)

		// The skills section should have id="skills" and be in the viewport
		const skillsSection = page.locator("#skills")
		await expect(skillsSection).toBeInViewport()

		// Verify it contains skills content
		await expect(skillsSection.locator(".skill-orbital-item").first()).toBeVisible()
	})

	test("mobile nav links scroll to correct sections", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 })

		// Open mobile menu
		await page.locator("#mobile-menu-btn").click()
		await page.waitForTimeout(400)

		// Click Experience link in mobile menu
		await page.locator('#mobile-menu a[href="#experience"]').click()
		await page.waitForTimeout(800)

		await expect(page.locator("#experience")).toBeInViewport()
	})

	test("mobile menu opens and closes with animation", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 })

		const menuBtn = page.locator("#mobile-menu-btn")
		const mobileMenu = page.locator("#mobile-menu")

		// Menu hidden initially
		const beforeOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(beforeOpacity)).toBeLessThan(0.1)

		// Open
		await menuBtn.click()
		await page.waitForTimeout(500)
		await expect(mobileMenu).toBeVisible()

		// Close
		await menuBtn.click()
		await page.waitForTimeout(500)

		const afterOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(afterOpacity)).toBeLessThan(0.1)
	})
})

test.describe("Language Dropdown", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
	})

	test("language dropdown shows current language with indicator", async ({ page }) => {
		const langBtn = page.locator("#lang-btn-desktop")
		await expect(langBtn).toBeVisible()
		await expect(langBtn).toHaveAttribute("data-lang", "en")

		// Open dropdown
		await langBtn.click()
		await page.waitForTimeout(300)

		const dropdown = page.locator("#lang-dropdown-desktop")
		await expect(dropdown).toBeVisible()

		// Should have System, English, Español options
		await expect(dropdown.locator('.lang-option[data-lang="system"]')).toBeVisible()
		await expect(dropdown.locator('.lang-option[data-lang="en"]')).toBeVisible()
		await expect(dropdown.locator('.lang-option[data-lang="es"]')).toBeVisible()

		// English should have the checkmark visible (active)
		const enCheck = dropdown.locator('.lang-option[data-lang="en"] .lang-check')
		const enCheckDisplay = await enCheck.evaluate((el) => window.getComputedStyle(el).display)
		expect(enCheckDisplay).not.toBe("none")
	})

	test("switching to Spanish and back", async ({ page }) => {
		// Switch to Spanish
		const langBtn = page.locator("#lang-btn-desktop")
		await langBtn.click()
		await page.waitForTimeout(200)
		await page.locator('#lang-dropdown-desktop .lang-option[data-lang="es"]').click()

		await page.waitForURL(/\/es\/?/)
		await page.waitForTimeout(1000)

		// Now switch back
		const langBtnEs = page.locator("#lang-btn-desktop")
		await langBtnEs.click()
		await page.waitForTimeout(200)
		await page.locator('#lang-dropdown-desktop .lang-option[data-lang="en"]').click()

		await page.waitForURL(/\/en\/?/)
	})
})
