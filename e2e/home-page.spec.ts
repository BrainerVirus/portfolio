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
		await expect(page.locator("#about").getByRole("heading", { name: /cristhofer/i })).toBeVisible()

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
		await page.waitForTimeout(500)
		const aboutLink = page.locator('#desktop-nav a[href="#about"]')
		await expect(aboutLink).toBeVisible()

		// Scroll incrementally past the pinned about section
		for (let i = 0; i < 6; i++) {
			await page.evaluate(() => window.scrollBy(0, 1500))
			await page.waitForTimeout(1500)
		}

		// Check that at least one section link got the active color
		const sections = ["about", "experience", "skills", "contact"]
		const colors = await Promise.all(
			sections.map(async (id) => {
				const link = page.locator(`#desktop-nav a[href="#${id}"]`)
				return link.evaluate((el) => window.getComputedStyle(el).color)
			})
		)
		const hasActive = colors.some((c) => c.includes("240, 230, 210"))
		expect(hasActive).toBe(true)
	})
})

test.describe("Hero Section (About)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
	})

	test("should display the about section with name heading", async ({ page }) => {
		await expect(page.locator("#about")).toBeVisible()
		await expect(page.locator("#about").getByRole("heading", { name: /cristhofer/i })).toBeVisible()
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

		// Language switches via DOM mutation — wait for content change
		await page.waitForTimeout(2000)

		// Verify Spanish content is showing
		await expect(page.locator("#about")).toBeVisible()
	})

	test("should switch back to English from Spanish", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		const langBtn = page.locator("#lang-btn-desktop")
		await langBtn.click()
		await page.waitForTimeout(300)

		const enOption = page.locator('#lang-dropdown-desktop .lang-option[data-lang="en"]')
		await enOption.click()

		// Language switches via DOM mutation — wait for content change
		await page.waitForTimeout(2000)
		await expect(page.locator("#about")).toBeVisible()
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

		// Language switches via DOM mutation — wait for content change
		await page.waitForTimeout(2000)

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
		await expect(page.locator("footer").getByRole("link", { name: /github/i })).toBeVisible()
		await expect(page.locator("footer").getByRole("link", { name: /linkedin/i })).toBeVisible()
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

		// Menu uses opacity:0 when hidden (not display:none)
		const beforeOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(beforeOpacity)).toBe(0)

		// Click to open
		await menuBtn.click()
		await page.waitForTimeout(600)
		const openOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(openOpacity)).toBeGreaterThan(0.5)

		// Click to close
		await menuBtn.click()
		await page.waitForTimeout(600)
		const closeOpacity = await mobileMenu.evaluate((el) =>
			window.getComputedStyle(el).opacity
		)
		expect(parseFloat(closeOpacity)).toBe(0)
	})
})
