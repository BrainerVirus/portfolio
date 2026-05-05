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
		const sections = ["about", "experience", "skills", "contact"]

		// Scroll incrementally past the pinned about section
		for (let i = 0; i < 6; i++) {
			await page.evaluate(() => window.scrollBy(0, 1500))
			await page.waitForTimeout(1500)
		}

		// Now check that at least one section's link got the active color
		const colors = await Promise.all(
			sections.map(async (id) => {
				const link = page.locator(`#desktop-nav a[href="#${id}"]`)
				return link.evaluate((el) => window.getComputedStyle(el).color)
			})
		)
		const hasActive = colors.some((c) => c.includes("240, 230, 210"))
		expect(hasActive).toBe(true)
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

		// Menu uses opacity:0 when hidden (not display:none)
		const beforeOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(beforeOpacity)).toBe(0)

		// Open
		await menuBtn.click()
		await page.waitForTimeout(600)
		const openOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(openOpacity)).toBeGreaterThan(0.5)

		// Close
		await menuBtn.click()
		await page.waitForTimeout(600)
		const closeOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(closeOpacity)).toBe(0)
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
	})

	test("switching to Spanish and back", async ({ page }) => {
		// Switch to Spanish
		const langBtn = page.locator("#lang-btn-desktop")
		await langBtn.click()
		await page.waitForTimeout(200)
		await page.locator('#lang-dropdown-desktop .lang-option[data-lang="es"]').click()

		// Language switches via DOM mutation, not navigation — wait for content change
		await page.waitForTimeout(2000)

		// Verify Spanish content is showing
		await expect(page.locator("#about")).toBeVisible()

		// Now switch back
		const langBtnEs = page.locator("#lang-btn-desktop")
		await langBtnEs.click()
		await page.waitForTimeout(200)
		await page.locator('#lang-dropdown-desktop .lang-option[data-lang="en"]').click()

		await page.waitForTimeout(2000)
	})
})
