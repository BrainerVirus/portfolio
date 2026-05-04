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

	test("hovering a card tilts only that card, not others", async ({ page }) => {
		const card1 = page.locator(".experience-entry").first()
		const card2 = page.locator(".experience-entry").nth(1)
		const r1Before = await card1.evaluate((el) => window.getComputedStyle(el).transform)
		const r2Before = await card2.evaluate((el) => window.getComputedStyle(el).transform)
		await card1.hover()
		await page.waitForTimeout(200)
		const r1After = await card1.evaluate((el) => window.getComputedStyle(el).transform)
		const r2After = await card2.evaluate((el) => window.getComputedStyle(el).transform)
		expect(r1After).not.toBe(r1Before)
		expect(r2After).toBe(r2Before)
	})

	test("card tilt returns to neutral on mouseleave", async ({ page }) => {
		const card = page.locator(".experience-entry").first()
		await card.hover()
		await page.waitForTimeout(200)
		await page.mouse.move(0, 0)
		await page.waitForTimeout(700)
		const transform = await card.evaluate((el) => window.getComputedStyle(el).transform)
		expect(transform).toBe("none")
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
		await page.locator(".experience-modal-close").click()
		await page.waitForTimeout(500)
		await expect(page.locator(".experience-modal")).not.toBeVisible()
	})

	test("clicking modal backdrop dismisses it", async ({ page }) => {
		await page.locator(".experience-entry").first().click()
		await page.waitForTimeout(500)
		await page.locator(".experience-modal").click({ position: { x: 10, y: 10 } })
		await page.waitForTimeout(500)
		await expect(page.locator(".experience-modal")).not.toBeVisible()
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
	})

	test("subtitle exists and is visible", async ({ page }) => {
		const subtitle = page.locator("#experience .experience-subtitle")
		await expect(subtitle).toBeVisible()
		const text = await subtitle.textContent()
		expect(text!.length).toBeGreaterThan(0)
	})
})
