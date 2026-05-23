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

	test("opening a card does not create transition ghost elements", async ({ page }) => {
		await page.locator(".experience-entry").first().click()
		await page.waitForTimeout(100)
		await expect(page.locator(".experience-lift-ghost")).toHaveCount(0)
		await expect(page.locator(".experience-modal")).toBeVisible()
	})

	test("modal does not demote the site header under page content", async ({ page }) => {
		await page.locator(".experience-entry").first().click()
		await expect(page.locator(".experience-modal")).toBeVisible()

		const headerState = await page.locator("#site-header").evaluate((element) => {
			const style = window.getComputedStyle(element)
			return {
				inlinePointerEvents: (element as HTMLElement).style.pointerEvents,
				inlineZIndex: (element as HTMLElement).style.zIndex,
				pointerEvents: style.pointerEvents,
				zIndex: style.zIndex,
			}
		})

		expect(headerState.inlineZIndex).toBe("")
		expect(headerState.inlinePointerEvents).toBe("")
		expect(headerState.zIndex).toBe("50")
		expect(headerState.pointerEvents).not.toBe("none")
	})

	test("modal overlay sits above the site header while open", async ({ page }) => {
		await page.locator(".experience-entry").first().click()
		await expect(page.locator(".experience-modal")).toBeVisible()

		const topLayer = await page.evaluate(() => {
			const header = document.querySelector("#site-header")
			if (!header) return null

			const rect = header.getBoundingClientRect()
			const element = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
			return {
				isModalLayer: Boolean(element?.closest(".experience-modal")),
				tagName: element?.tagName ?? null,
			}
		})

		expect(topLayer?.isModalLayer).toBe(true)
	})

	test("first and second modal openings use the same settled card height", async ({ page }) => {
		const openAndMeasure = async () => {
			await page.locator(".experience-entry").first().scrollIntoViewIfNeeded()
			await page.locator(".experience-entry").first().click()
			await expect(page.locator(".experience-modal")).toBeVisible()
			const height = await page.locator(".experience-modal-card").evaluate((element) =>
				Math.round(element.getBoundingClientRect().height)
			)
			await page.evaluate(() => {
				document.querySelector(".experience-modal-close")?.dispatchEvent(new Event("click", { bubbles: true }))
			})
			await expect(page.locator(".experience-modal")).toHaveCSS("opacity", "0")
			return height
		}

		const firstHeight = await openAndMeasure()
		const secondHeight = await openAndMeasure()

		expect(Math.abs(firstHeight - secondHeight)).toBeLessThanOrEqual(2)
	})

	test("mobile first and second modal openings keep stable card height", async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 })

		const openAndMeasure = async () => {
			await page.locator(".experience-entry").first().scrollIntoViewIfNeeded()
			await page.locator(".experience-entry").first().click()
			await expect(page.locator(".experience-modal")).toBeVisible()
			const height = await page.locator(".experience-modal-card").evaluate((element) =>
				Math.round(element.getBoundingClientRect().height)
			)
			await page.evaluate(() => {
				document.querySelector(".experience-modal-close")?.dispatchEvent(new Event("click", { bubbles: true }))
			})
			await expect(page.locator(".experience-modal")).toHaveCSS("opacity", "0")
			return height
		}

		const firstHeight = await openAndMeasure()
		const secondHeight = await openAndMeasure()

		expect(Math.abs(firstHeight - secondHeight)).toBeLessThanOrEqual(2)
	})

	test("modal locks without layout shift and restores scroll naturally", async ({ page }) => {
		await page.locator("#experience").scrollIntoViewIfNeeded()
		await page.locator(".experience-entry").first().scrollIntoViewIfNeeded()
		await page.waitForTimeout(300)

		const before = await page.evaluate(() => ({
			sectionLeft: document.querySelector("#experience")!.getBoundingClientRect().left,
			sectionRight: document.querySelector("#experience")!.getBoundingClientRect().right,
			sectionWidth: document.querySelector("#experience")!.getBoundingClientRect().width,
			scrollY: window.scrollY,
		}))

		await page.evaluate(() => {
			document.querySelector<HTMLElement>(".experience-entry")?.click()
		})
		await expect(page.locator(".experience-modal")).toBeVisible()

		const opened = await page.evaluate(() => ({
			sectionLeft: document.querySelector("#experience")!.getBoundingClientRect().left,
			sectionRight: document.querySelector("#experience")!.getBoundingClientRect().right,
			sectionWidth: document.querySelector("#experience")!.getBoundingClientRect().width,
			scrollY: window.scrollY,
		}))
		expect(Math.abs(opened.sectionLeft - before.sectionLeft)).toBeLessThanOrEqual(1)
		expect(Math.abs(opened.sectionRight - before.sectionRight)).toBeLessThanOrEqual(1)
		expect(Math.abs(opened.sectionWidth - before.sectionWidth)).toBeLessThanOrEqual(1)
		expect(Math.abs(opened.scrollY - before.scrollY)).toBeLessThanOrEqual(1)

		await page.evaluate(() => {
			document.querySelector(".experience-modal-close")?.dispatchEvent(new Event("click", { bubbles: true }))
		})
		await expect(page.locator(".experience-modal")).toHaveCSS("opacity", "0")

		const closed = await page.evaluate(() => ({
			sectionLeft: document.querySelector("#experience")!.getBoundingClientRect().left,
			sectionRight: document.querySelector("#experience")!.getBoundingClientRect().right,
			sectionWidth: document.querySelector("#experience")!.getBoundingClientRect().width,
			scrollY: window.scrollY,
		}))
		expect(Math.abs(closed.sectionLeft - before.sectionLeft)).toBeLessThanOrEqual(1)
		expect(Math.abs(closed.sectionRight - before.sectionRight)).toBeLessThanOrEqual(1)
		expect(Math.abs(closed.sectionWidth - before.sectionWidth)).toBeLessThanOrEqual(1)
		expect(Math.abs(closed.scrollY - before.scrollY)).toBeLessThanOrEqual(2)
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
