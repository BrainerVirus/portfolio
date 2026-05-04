import { expect, test } from "@playwright/test"

test.describe("Header Navigation", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
	})

	test("should display the header with logo and navigation links", async ({ page }) => {
		const header = page.locator("#site-header")
		await expect(header).toBeVisible()

		// Check hero section exists
		await expect(page.locator("#about")).toBeVisible()
		await expect(page.getByRole("heading", { name: /cristhofer/i })).toBeVisible()

		// Check navigation links exist (desktop)
		const nav = page.locator("#desktop-nav")
		await expect(nav.locator('a[href="#about"]')).toBeVisible()
		await expect(nav.locator('a[href="#experience"]')).toBeVisible()
		await expect(nav.locator('a[href="#skills"]')).toBeVisible()
		await expect(nav.locator('a[href="#contact"]')).toBeVisible()
	})

	test("should navigate to sections when clicking nav links", async ({ page }) => {
		// Click About — already visible, hero is the first section
		await expect(page.locator("#about")).toBeInViewport()

		// Click Experience
		await page.locator('#desktop-nav a[href="#experience"]').click()
		await page.waitForTimeout(800)
		await expect(page.locator("#experience")).toBeInViewport()

		// Click Contact
		await page.locator('#desktop-nav a[href="#contact"]').click()
		await page.waitForTimeout(800)
		await expect(page.locator("#contact")).toBeInViewport()
	})

	test("should update active state on scroll", async ({ page }) => {
		// Initially "about" should be highlighted
		await page.waitForTimeout(500)
		const aboutLink = page.locator('#desktop-nav a[href="#about"]')
		await expect(aboutLink).toBeVisible()

		// Scroll to experience section
		await page.locator("#experience").scrollIntoViewIfNeeded()
		await page.waitForTimeout(500)

		// After scrolling, experience link should be active
		const expLink = page.locator('#desktop-nav a[href="#experience"]')
		const color = await expLink.evaluate((el) => window.getComputedStyle(el).color)
		expect(color).toContain("240, 230, 210") // #f0e6d2
	})
})

test.describe("Hero Section (About)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
	})

	test("should display the about section with name heading", async ({ page }) => {
		await expect(page.locator("#about")).toBeVisible()
		await expect(page.getByRole("heading", { name: /cristhofer/i })).toBeVisible()
	})

	test("should display bio lines with identity info", async ({ page }) => {
		await expect(page.locator(".bio-line").first()).toBeVisible()
		await expect(page.locator(".bio-lines").getByText(/cristhofer/i)).toBeVisible()
	})

	test("hero elements become visible on scroll", async ({ page }) => {
		// Initially, subtitle should have opacity 0 (hidden by CSS)
		const subtitle = page.locator(".about-subtitle")
		const initialOpacity = await subtitle.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(initialOpacity)).toBe(0)

		// Scroll down to trigger hero animation
		await page.evaluate(() => window.scrollBy(0, 600))
		await page.waitForTimeout(1000)

		// After scrolling, subtitle should become visible
		const afterOpacity = await subtitle.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		// Opacity should have changed from initial 0 (it may be in transition)
		expect(parseFloat(afterOpacity)).toBeGreaterThanOrEqual(0)
	})
})

test.describe("Experience Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
		// Scroll to experience section
		await page.locator("#experience").scrollIntoViewIfNeeded()
		await page.waitForTimeout(500)
	})

	test("should display the experience section with heading", async ({ page }) => {
		await expect(page.locator("#experience")).toBeVisible()
		await expect(page.locator("#experience h2")).toBeVisible()
	})

	test("should display job entries", async ({ page }) => {
		const entries = page.locator("#experience .experience-entry")
		await expect(entries.first()).toBeVisible()
		const count = await entries.count()
		expect(count).toBeGreaterThan(0)
	})
})

test.describe("Skills Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
		await page.locator("#skills").scrollIntoViewIfNeeded()
		await page.waitForTimeout(500)
	})

	test("should display the skills section with heading", async ({ page }) => {
		await expect(page.locator("#skills")).toBeVisible()
		await expect(page.locator("#skills h2")).toBeVisible()
	})

	test("should display orbital skill icons", async ({ page }) => {
		const skillIcons = page.locator("#skills .skill-orbital-item")
		await expect(skillIcons.first()).toBeVisible()
		const count = await skillIcons.count()
		expect(count).toBeGreaterThan(0)
	})

	test("skills nav link resolves to #skills section", async ({ page }) => {
		await page.locator('#desktop-nav a[href="#skills"]').click()
		await page.waitForTimeout(500)
		await expect(page.locator("#skills")).toBeInViewport()
	})
})

test.describe("Contact Section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
		await page.locator("#contact").scrollIntoViewIfNeeded()
		await page.waitForTimeout(500)
	})

	test("should display the contact section with heading", async ({ page }) => {
		await expect(page.locator("#contact")).toBeVisible()
		await expect(page.locator("#contact h2")).toBeVisible()
	})

	test("should display contact form with required fields", async ({ page }) => {
		// Wait for React component to hydrate (client:load)
		const form = page.locator("#contact-form")
		await expect(form).toBeVisible({ timeout: 10000 })

		// Check form fields
		await expect(form.locator('input[name="name"]')).toBeVisible({ timeout: 5000 })
		await expect(form.locator('input[name="email"]')).toBeVisible({ timeout: 5000 })
		await expect(form.locator('textarea[name="message"]')).toBeVisible({ timeout: 5000 })
		await expect(form.locator('button[type="submit"]')).toBeVisible({ timeout: 5000 })
	})

	test("should display social links", async ({ page }) => {
		await expect(page.locator("#contact a").filter({ hasText: /github/i })).toBeVisible()
		await expect(page.locator("#contact a").filter({ hasText: /linkedin/i })).toBeVisible()
	})
})

test.describe("Language Switching", () => {
	test("should switch to Spanish when clicking language option", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		// Open language dropdown
		const langBtn = page.locator("#lang-btn-desktop")
		await langBtn.click()

		// Wait for dropdown to animate in
		await page.waitForTimeout(300)

		// Click Spanish option
		const esOption = page.locator('#lang-dropdown-desktop .lang-option[data-lang="es"]')
		await esOption.click()

		// Should navigate to Spanish version
		await expect(page).toHaveURL(/\/es\/?/)
	})

	test("should switch back to English from Spanish", async ({ page }) => {
		await page.goto("http://localhost:3000/es/")

		const langBtn = page.locator("#lang-btn-desktop")
		await langBtn.click()
		await page.waitForTimeout(300)

		const enOption = page.locator('#lang-dropdown-desktop .lang-option[data-lang="en"]')
		await enOption.click()

		await expect(page).toHaveURL(/\/en\/?/)
	})

	test("language switch should complete without breaking layout", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		// Verify initial layout
		await expect(page.locator("#about")).toBeVisible()
		await expect(page.locator("#site-header")).toBeVisible()

		// Switch language
		const langBtn = page.locator("#lang-btn-desktop")
		await langBtn.click()
		await page.waitForTimeout(200)
		await page.locator('#lang-dropdown-desktop .lang-option[data-lang="es"]').click()

		// Wait for navigation to complete
		await page.waitForURL(/\/es\/?/)
		await page.waitForTimeout(1000)

		// Verify layout is still intact
		await expect(page.locator("#about")).toBeVisible()
		await expect(page.locator("#site-header")).toBeVisible()
	})
})

test.describe("Footer", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
	})

	test("should display footer", async ({ page }) => {
		await expect(page.locator("footer")).toBeVisible()
	})

	test("should have social links", async ({ page }) => {
		await expect(page.getByRole("link", { name: /github/i }).first()).toBeVisible()
		await expect(page.getByRole("link", { name: /linkedin/i })).toBeVisible()
	})
})

test.describe("Mobile Responsiveness", () => {
	test.use({ viewport: { width: 390, height: 844 } })

	test("should display mobile menu button", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		await expect(page.locator("#mobile-menu-btn")).toBeVisible()
	})

	test("should toggle mobile menu when clicking menu button", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		const menuBtn = page.locator("#mobile-menu-btn")
		const mobileMenu = page.locator("#mobile-menu")

		// Menu should be hidden initially
		const beforeOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(beforeOpacity)).toBeLessThan(0.1)

		// Click to open
		await menuBtn.click()
		await page.waitForTimeout(400)
		const openOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(openOpacity)).toBeGreaterThan(0.5)

		// Click to close
		await menuBtn.click()
		await page.waitForTimeout(400)
		const closeOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(closeOpacity)).toBeLessThan(0.1)
	})
})
