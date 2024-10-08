import { expect, test } from "@playwright/test"

test.describe("Hero section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000")
	})

	test("should display the hero section", async ({ page }) => {
		await expect(
			page.locator("#hero-title", {
				has: page.getByText("Software Engineer", { exact: true }),
			})
		).toBeInViewport()

		await expect(
			page.locator("#hero-description", {
				has: page.getByText(
					"Turning ideas into reality. I design beautiful user interfaces and craft powerful backends for web, desktop, and mobile apps.",
					{ exact: true }
				),
			})
		).toBeInViewport()
	})

	test("should navigate to the about me section when clicking on 'About me' link", async ({
		page,
	}) => {
		const aboutMeLink = await page.$('a[href="#about-me"]')
		await aboutMeLink?.click()

		const aboutMeTitle = await page.$eval("#about-me-title", (element) => element.textContent)

		expect(aboutMeTitle).toContain("Hello there,")
		expect(aboutMeTitle).toContain("I'm Cristhofer Pincetti")
	})
})

test.describe("About section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/")
		await page.getByRole("link", { name: "about me" }).click()
	})

	test("should have a visible heading", async ({ page }) => {
		await expect(
			page.locator("#about-me", { has: page.locator("#about-me-title") })
		).toBeInViewport()
	})

	test("should have a visible description", async ({ page }) => {
		await expect(
			page.locator("#about-me", { has: page.locator("#about-me-description") })
		).toBeInViewport()
	})
})

// test.describe("Experience section", () => {
// 	test.beforeEach(async ({ page }) => {
// 		await page.goto("http://localhost:3000/#experience")
// 	})

// 	test("should display experience section with correct content", async ({ page }) => {
// 		// Verify experience section is visible
// 		await expect(page.locator("#experience")).toBeVisible()
// 		// Ensure buttons are present
// 		await expect(page.locator("#button-slide-1")).toBeVisible()
// 		await expect(page.locator("#button-slide-2")).toBeVisible()
// 		await expect(page.locator("#button-slide-3")).toBeVisible()
// 	})
// })

test.describe("Skills section", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/#skills")
	})

	test("should display the skills section title", async ({ page }) => {
		await expect(page.locator("#skills-title")).toBeVisible()
	})

	test("should display the skills section description", async ({ page }) => {
		await expect(page.locator("#skills-description")).toBeVisible()
	})

	test("should display the skills section LinkedIn link", async ({ page }) => {
		await expect(page.locator("#skills-linkedin")).toBeVisible()
	})

	test("should display specific skills", async ({ page }) => {
		const skills = [
			"Next JS",
			"Angular",
			"Astro",
			"Electron",
			"React",
			"React Native",
			"Node JS",
			"Tailwind CSS",
			"TypeScript",
			"HTML:5",
			"JavaScript",
			"CSS3",
			"PostgreSQL",
			"MySQL",
			"MongoDB",
			"Prisma",
			"Sequelize",
			"Github",
			"Gitlab",
		]

		for (const skill of skills) {
			await expect(page.getByText(skill, { exact: true })).toBeVisible()
		}
	})
})
