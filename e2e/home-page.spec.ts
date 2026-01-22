import { expect, test } from "@playwright/test"

test.describe("Header Navigation", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
	})

	test("should display the header with logo and navigation links", async ({ page }) => {
		await expect(page.locator("header")).toBeVisible()

		// Check logo elements exist
		await expect(page.locator("header .logo-ring")).toBeVisible()
		await expect(page.getByText("Cristhofer Pincetti").first()).toBeVisible()
		await expect(page.getByText("Software Engineer")).toBeVisible()

		// Check navigation links exist (desktop)
		await expect(page.getByRole("link", { name: /pilot's log/i })).toBeVisible()
		await expect(page.getByRole("link", { name: /mission log/i })).toBeVisible()
		await expect(page.getByRole("link", { name: /arsenal/i })).toBeVisible()
		await expect(page.getByRole("link", { name: /contact/i })).toBeVisible()
	})

	test("should navigate to sections when clicking nav links", async ({ page }) => {
		await page
			.getByRole("link", { name: /pilot's log/i })
			.first()
			.click()
		await expect(page.locator("#about")).toBeInViewport()
	})
})

test.describe("About section (Pilot's Log)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/#about")
	})

	test("should display the about section with title", async ({ page }) => {
		await expect(page.locator("#about")).toBeVisible()
		await expect(page.getByRole("heading", { name: /pilot's log/i })).toBeVisible()
	})

	test("should display terminal window with identity info", async ({ page }) => {
		// Check terminal window exists
		await expect(page.locator(".terminal-window")).toBeVisible()

		// Check identity information
		await expect(page.getByText(/cristhofer pincetti/i)).toBeVisible()
		await expect(page.getByText(/full stack engineer/i)).toBeVisible()
	})
})

test.describe("Experience section (Mission Log)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/#experience")
	})

	test("should display the experience section with title", async ({ page }) => {
		await expect(page.locator("#experience")).toBeVisible()
		await expect(page.getByRole("heading", { name: /mission log/i })).toBeVisible()
	})

	test("should display timeline with job entries", async ({ page }) => {
		// Check timeline line exists
		await expect(page.locator(".timeline-line")).toBeVisible()

		// Check there are job cards (glass cards within experience section)
		const jobCards = page.locator("#experience .glass-card")
		await expect(jobCards.first()).toBeVisible()
	})
})

test.describe("Skills section (Technical Arsenal)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/#skills")
	})

	test("should display the skills section with title", async ({ page }) => {
		await expect(page.locator("#skills")).toBeVisible()
		await expect(page.getByRole("heading", { name: /technical arsenal/i })).toBeVisible()
	})

	test("should display orbit rings with skill icons", async ({ page }) => {
		// Check orbit container exists
		await expect(page.locator(".orbit-container")).toBeVisible()

		// Check there are skill icons (orbit-icon-wrapper elements)
		const skillIcons = page.locator(".orbit-icon-wrapper")
		await expect(skillIcons.first()).toBeVisible()
	})
})

test.describe("Contact section (Comm Link)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/#contact")
	})

	test("should display the contact section with title", async ({ page }) => {
		await expect(page.locator("#contact")).toBeVisible()
		await expect(page.getByRole("heading", { name: /establish comm link/i })).toBeVisible()
	})

	test("should display contact form with required fields", async ({ page }) => {
		// Check form exists
		const form = page.locator("#contact-form")
		await expect(form).toBeVisible()

		// Check form fields
		await expect(form.locator('input[name="name"]')).toBeVisible()
		await expect(form.locator('input[name="email"]')).toBeVisible()
		await expect(form.locator('textarea[name="message"]')).toBeVisible()

		// Check submit button
		await expect(form.locator('button[type="submit"]')).toBeVisible()
	})
})

test.describe("Language switching", () => {
	test("should switch to Spanish when clicking language toggle", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		// Find and click the language switch button (contains 'ES')
		const langSwitch = page.locator('button#lang-switch:has-text("ES")')
		await expect(langSwitch).toBeVisible()
		await langSwitch.click()

		// Should navigate to Spanish version
		await expect(page).toHaveURL(/\/es\/?/)

		// Check Spanish content is displayed
		await expect(page.getByRole("heading", { name: /bitácora del piloto/i })).toBeVisible()
	})
})

test.describe("Footer", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
	})

	test("should display footer with logo and constellation links", async ({ page }) => {
		await expect(page.locator("footer")).toBeVisible()

		// Check footer logo
		await expect(page.locator("footer .logo-ring")).toBeVisible()
		await expect(page.locator("footer").getByText("Cristhofer Pincetti").first()).toBeVisible()

		// Check social links
		await expect(page.getByRole("link", { name: /github/i }).first()).toBeVisible()
		await expect(page.getByRole("link", { name: /linkedin/i })).toBeVisible()

		// Check back to top button
		await expect(page.getByRole("button", { name: /back to zenith/i })).toBeVisible()
	})

	test("should scroll to top when clicking back to top button", async ({ page }) => {
		// First scroll to footer
		await page.locator("footer").scrollIntoViewIfNeeded()

		// Click back to top button
		await page.getByRole("button", { name: /back to zenith/i }).click()

		// Wait for smooth scroll animation
		await page.waitForTimeout(500)

		// Verify we're at the top (about section should be visible)
		await expect(page.locator("#about")).toBeInViewport()
	})
})

test.describe("Mobile responsiveness", () => {
	test.use({ viewport: { width: 390, height: 844 } }) // iPhone 12/13 dimensions

	test("should not have unwanted transitions on language switch button", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		const langSwitch = page.locator("#lang-switch").first()
		await expect(langSwitch).toBeVisible()

		// Get initial bounding box
		const initialBox = await langSwitch.boundingBox()
		expect(initialBox).not.toBeNull()

		// Hover over a different element (header)
		await page.locator("header").hover()
		await page.waitForTimeout(100)

		// Get bounding box after hover elsewhere
		const afterHoverBox = await langSwitch.boundingBox()
		expect(afterHoverBox).not.toBeNull()

		// Position should not have changed
		expect(afterHoverBox?.x).toBe(initialBox?.x)
		expect(afterHoverBox?.y).toBe(initialBox?.y)
		expect(afterHoverBox?.width).toBe(initialBox?.width)
		expect(afterHoverBox?.height).toBe(initialBox?.height)
	})

	test("should display mobile menu button", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		// Mobile menu button should be visible
		await expect(page.locator("#mobile-menu-btn")).toBeVisible()

		// Desktop nav should be hidden
		await expect(page.locator("nav.hidden.md\\:flex")).not.toBeVisible()
	})

	test("should toggle mobile menu when clicking menu button", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		const menuBtn = page.locator("#mobile-menu-btn")
		const mobileMenu = page.locator("#mobile-menu")

		// Menu should be hidden initially
		await expect(mobileMenu).toHaveClass(/hidden/)

		// Click to open
		await menuBtn.click()
		await expect(mobileMenu).not.toHaveClass(/hidden/)

		// Click to close
		await menuBtn.click()
		await expect(mobileMenu).toHaveClass(/hidden/)
	})
})

test.describe("Position stability during scrolling", () => {
	test.use({ viewport: { width: 542, height: 844 } }) // Problem width reported by user

	test("header controls should not shift position during scroll at 542px width", async ({
		page,
	}) => {
		await page.goto("http://localhost:3000/en/")

		const langSwitch = page.locator("#lang-switch").first()
		const menuBtn = page.locator("#mobile-menu-btn")

		await expect(langSwitch).toBeVisible()
		await expect(menuBtn).toBeVisible()

		// Get initial positions
		const initialLangBox = await langSwitch.boundingBox()
		const initialMenuBox = await menuBtn.boundingBox()

		expect(initialLangBox).not.toBeNull()
		expect(initialMenuBox).not.toBeNull()

		// Scroll down to trigger any transition issues
		await page.evaluate(() => window.scrollBy(0, 500))
		await page.waitForTimeout(200)

		// Get positions after scroll
		const afterScrollLangBox = await langSwitch.boundingBox()
		const afterScrollMenuBox = await menuBtn.boundingBox()

		// Positions should remain stable (same x coordinates and sizes)
		// Y might change due to fixed header, but x and size should be consistent
		expect(afterScrollLangBox?.x).toBe(initialLangBox?.x)
		expect(afterScrollLangBox?.width).toBe(initialLangBox?.width)
		expect(afterScrollLangBox?.height).toBe(initialLangBox?.height)

		expect(afterScrollMenuBox?.x).toBe(initialMenuBox?.x)
		expect(afterScrollMenuBox?.width).toBe(initialMenuBox?.width)
		expect(afterScrollMenuBox?.height).toBe(initialMenuBox?.height)
	})

	test("header controls should not animate/float during viewport resize", async ({ page }) => {
		await page.goto("http://localhost:3000/en/")

		const langSwitch = page.locator("#lang-switch").first()

		// Test at various widths around the problem zone (542px and below)
		const testWidths = [600, 550, 542, 500, 450, 400]

		for (const width of testWidths) {
			await page.setViewportSize({ width, height: 844 })
			await page.waitForTimeout(100)

			// Verify controls are still visible and haven't disappeared
			await expect(langSwitch).toBeVisible()

			// Get position after resize
			const box = await langSwitch.boundingBox()
			expect(box).not.toBeNull()

			// Ensure the element stays within viewport bounds
			expect(box!.x).toBeGreaterThanOrEqual(0)
			expect(box!.x + box!.width).toBeLessThanOrEqual(width)
		}
	})
})

test.describe("No transition-all side effects", () => {
	test("experience cards should not have layout shifts on hover", async ({ page }) => {
		await page.goto("http://localhost:3000/en/#experience")

		const experienceCard = page.locator("#experience .glass-card").first()
		await expect(experienceCard).toBeVisible()

		// Get initial position
		const initialBox = await experienceCard.boundingBox()
		expect(initialBox).not.toBeNull()

		// Hover over the card
		await experienceCard.hover()
		await page.waitForTimeout(350) // Wait for transition duration (300ms) plus buffer

		// Get position after hover
		const afterHoverBox = await experienceCard.boundingBox()

		// Width should remain the same (only transform/shadow should change)
		expect(afterHoverBox?.width).toBe(initialBox?.width)

		// X position should remain the same
		expect(afterHoverBox?.x).toBe(initialBox?.x)
	})

	test("contact form inputs should not shift on focus", async ({ page }) => {
		await page.goto("http://localhost:3000/en/#contact")

		const nameInput = page.locator("#contact-form input[name='name']")
		await expect(nameInput).toBeVisible()

		// Get initial position
		const initialBox = await nameInput.boundingBox()
		expect(initialBox).not.toBeNull()

		// Focus the input
		await nameInput.focus()
		await page.waitForTimeout(200)

		// Get position after focus
		const afterFocusBox = await nameInput.boundingBox()

		// Position and size should remain stable
		expect(afterFocusBox?.x).toBe(initialBox?.x)
		expect(afterFocusBox?.y).toBe(initialBox?.y)
		expect(afterFocusBox?.width).toBe(initialBox?.width)
		expect(afterFocusBox?.height).toBe(initialBox?.height)
	})

	test("skill orbit icons should maintain position during hover", async ({ page }) => {
		await page.goto("http://localhost:3000/en/#skills")

		const skillIcon = page.locator(".orbit-icon-wrapper").first()
		await expect(skillIcon).toBeVisible()

		// Get initial position
		const initialBox = await skillIcon.boundingBox()
		expect(initialBox).not.toBeNull()

		// Hover over the skill icon
		await skillIcon.hover()
		await page.waitForTimeout(350)

		// Get position after hover - the parent element should not shift
		const afterHoverBox = await skillIcon.boundingBox()

		// Position should remain stable (tooltip appears above, not shifting the icon)
		expect(afterHoverBox?.x).toBe(initialBox?.x)
		expect(afterHoverBox?.y).toBe(initialBox?.y)
		expect(afterHoverBox?.width).toBe(initialBox?.width)
		expect(afterHoverBox?.height).toBe(initialBox?.height)
	})
})
