import { test, expect } from "@playwright/test";

test.describe("Hero section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display the hero section", async ({ page }) => {
    await expect(
      page.locator("#hero-title", {
        has: page.getByText("Full-Stack Software Developer", { exact: true }),
      }),
    ).toBeInViewport();

    await expect(
      page.locator("#hero-description", {
        has: page.getByText(
          "Resolving problems, building APPs, modules, APIs, integrations, and more.",
          { exact: true },
        ),
      }),
    ).toBeInViewport();
  });

  test("should have a navigation to go to about me section", async ({
    page,
  }) => {
    await page.getByText("about me", { exact: true }).click;
    await expect(page.locator("a[href='#about-me']")).toBeInViewport();
  });

  test('should navigate to the about me section when clicking on "About me" link', async ({
    page,
  }) => {
    const aboutMeLink = await page.$('a[href="#about-me"]');
    await aboutMeLink?.click();

    const aboutMeTitle = await page.$eval(
      "#about-me-title",
      (element) => element.textContent,
    );

    expect(aboutMeTitle).toContain("Hello there,");
    expect(aboutMeTitle).toContain("I'm Cristhofer Pincetti");
  });
});

test.describe("About section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "about me" }).click();
  });

  test("should be visible", async ({ page }) => {
    await expect(page.locator("#about-me")).toBeInViewport();
  });

  test("should have a visible heading", async ({ page }) => {
    await expect(
      page.locator("#about-me", { has: page.locator("#about-me-title") }),
    ).toBeInViewport();
  });

  test("should have a visible description", async ({ page }) => {
    await expect(
      page.locator("#about-me", { has: page.locator("#about-me-description") }),
    ).toBeInViewport();
  });
});

test.describe("Experience section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/#experience");
  });

  test("should display experience section with correct content", async ({
    page,
  }) => {
    // Verify slide 1 content
    await expect(page.locator("#experience-title")).toHaveText("Experience");
    await expect(page.locator("#experience-description")).toHaveText(
      "My main expertise lies in front-end and back-end development, with a strong command of Node.js, JavaScript, and database design. I have led the development of comprehensive web platforms, implementing features like report generation, role-based authentication, and mobile application APIs. Additionally, I excel in design assets and UI/UX, ensuring seamless user experiences. I've also optimized processes, managed document systems, and contributed to system integration. My diverse skill set and problem-solving abilities drive innovative tech solutions.",
    );

    // Verify slide 2 content
    await expect(page.locator("#experience-title-slide-2")).toHaveText(
      "Software Engineer at Hospital San Juan de Dios",
    );
    await expect(
      page.locator("#experience-description-slide-2 > p:nth-child(1)"),
    ).toHaveText("October 2022 - September 2023");
    await expect(
      page.locator("#experience-description-slide-2 > p:nth-child(2)"),
    ).toHaveText("Description of your project and contributions.");
    // You can add assertions for the image as well

    // Verify slide 3 content
    await expect(page.locator("#experience-title-slide-3")).toHaveText(
      "Software Developer at Universidad de La Serena",
    );
    await expect(
      page.locator("#experience-description-slide-3 > p:nth-child(1)"),
    ).toHaveText("September 2023 - Present");
    await expect(
      page.locator("#experience-description-slide-3 > p:nth-child(2)"),
    ).toHaveText("Description of your project and contributions.");
    // You can add assertions for the image as well

    // Ensure buttons are present
    await expect(page.locator("#button-slide-1")).toBeVisible();
    await expect(page.locator("#button-slide-2")).toBeVisible();
    await expect(page.locator("#button-slide-3")).toBeVisible();
  });
});

test.describe("Skills section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/#skills");
  });

  test("should display the skills section title", async ({ page }) => {
    await expect(page.locator("#skills-title")).toBeVisible();
  });

  test("should display the skills section description", async ({ page }) => {
    await expect(page.locator("#skills-description")).toBeVisible();
  });

  test("should display the skills section LinkedIn link", async ({ page }) => {
    await expect(page.locator("#skills-linkedin")).toBeVisible();
  });

  test("should display specific skills", async ({ page }) => {
    const skills = [
      "Next JS",
      "Astro",
      "Node JS",
      "JavaScript",
      "CSS",
      "HTML:5",
      "Tailwind CSS",
      "TypeScript",
      "PostgreSQL",
      "MySQL",
      "Prisma",
      "Sequelize",
      "Github Actions",
      "MongoDB",
      "Git",
    ];

    for (const skill of skills) {
      await expect(page.getByText(skill, { exact: true })).toBeVisible();
    }
  });
});
