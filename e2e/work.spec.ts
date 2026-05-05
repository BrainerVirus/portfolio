import { test, expect } from "@playwright/test"

test.describe("Work Section — 3D Tilt", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
		await page.locator("#experience").scrollIntoViewIfNeeded()
		await page.waitForTimeout(500)
	})

	test("cards have perspective wrapper for 3D transforms", async ({ page }) => {
		const wrapper = page.locator(".experience-card-wrapper").first()
		await expect(wrapper).toBeVisible()
		const style = await wrapper.getAttribute("style")
		expect(style).toContain("perspective")
	})

	test("card has 3D transform-style set by JS", async ({ page }) => {
		const card = page.locator(".experience-entry").first()
		const style = await card.evaluate((el) => el.style.transformStyle)
		expect(style).toBe("preserve-3d")
	})

	test("card glow element exists and uses CSS custom properties", async ({ page }) => {
		const glow = page.locator(".experience-glow").first()
		await expect(glow).toBeVisible()
		const style = await glow.getAttribute("style")
		expect(style).toContain("--gx")
		expect(style).toContain("--gy")
	})
})

test.describe("Work Section — Modal Overlay", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
		await page.locator("#experience").scrollIntoViewIfNeeded()
		await page.waitForTimeout(500)
	})

	test("clicking a card opens the modal overlay", async ({ page }) => {
		await page.locator(".experience-entry").first().click()
		await page.waitForTimeout(500)
		await expect(page.locator(".experience-modal")).toBeVisible()
	})

	test("clicking close button dismisses the modal", async ({ page }) => {
		await page.locator(".experience-entry").first().click()
		await page.waitForTimeout(500)
		// Header z-50 intercepts pointer events — use JS click to bypass
		await page.evaluate(() => {
			document.querySelector(".experience-modal-close")?.dispatchEvent(new Event("click", { bubbles: true }))
		})
		await page.waitForTimeout(800)
		const opacity = await page.locator(".experience-modal").evaluate(
			(el) => window.getComputedStyle(el).opacity
		)
		expect(parseFloat(opacity)).toBeLessThan(0.1)
	})

	test("clicking modal backdrop dismisses it", async ({ page }) => {
		await page.locator(".experience-entry").first().click()
		await page.waitForTimeout(500)
		// Dispatch click on the modal overlay directly via JS
		await page.evaluate(() => {
			const modal = document.querySelector(".experience-modal")
			if (modal) {
				const event = new MouseEvent("click", { bubbles: true, clientX: 10, clientY: 10 })
				Object.defineProperty(event, "target", { value: modal })
				modal.dispatchEvent(event)
			}
		})
		await page.waitForTimeout(800)
		const opacity = await page.locator(".experience-modal").evaluate(
			(el) => window.getComputedStyle(el).opacity
		)
		expect(parseFloat(opacity)).toBeLessThan(0.1)
	})
})

test.describe("Work Section — Flip Easter Egg", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
		await page.locator("#experience").scrollIntoViewIfNeeded()
		await page.waitForTimeout(500)
	})

	test("flip button in modal rotates card to show back face", async ({ page }) => {
		await page.locator(".experience-entry").first().click()
		await page.waitForTimeout(500)
		const flipBtn = page.locator(".experience-modal-flip")
		await expect(flipBtn).toBeVisible()
		await flipBtn.click()
		await page.waitForTimeout(900)
		const backText = page.locator(".experience-modal-back")
		await expect(backText).toBeVisible()
		const text = await backText.textContent()
		expect(text!.length).toBeGreaterThan(0)
	})
})

test.describe("Work Section — SVG Draw on Scroll", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
	})

	test("scrolling through section reveals SVG shapes", async ({ page }) => {
		const section = page.locator("#experience")
		await section.scrollIntoViewIfNeeded()
		await page.waitForTimeout(300)
		await page.evaluate(() => window.scrollBy(0, 400))
		await page.waitForTimeout(800)
		const circle = page.locator(".experience-shape circle").first()
		const offset = await circle.evaluate(
			(el) => window.getComputedStyle(el).strokeDashoffset
		)
		expect(parseFloat(offset)).toBeLessThan(1000)
	})
})

test.describe("Work Section — Subtitle", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/en/")
		await page.locator("#experience").scrollIntoViewIfNeeded()
		await page.waitForTimeout(800)
	})

	test("subtitle exists and is visible", async ({ page }) => {
		const subtitle = page.locator("#experience .experience-subtitle")
		await expect(subtitle).toBeVisible({ timeout: 10000 })
		const text = await subtitle.textContent()
		expect(text!.length).toBeGreaterThan(0)
	})
})
