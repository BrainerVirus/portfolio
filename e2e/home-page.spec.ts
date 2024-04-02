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
    await expect(page.locator("#experience-title-slide-1")).toHaveText(
      "Hospital San Juan de Dios",
    );
    await expect(page.locator("#experience-description-slide-1 h3")).toHaveText(
      "Software Engineer",
    );
    await expect(
      page.locator("#experience-description-slide-1 p:nth-child(2)"),
    ).toHaveText("October 2022 - September 2023");
    await expect(
      page.locator("#experience-description-slide-1 p:nth-child(4)"),
    ).toHaveText(
      "Led the development of a finance module, encompassing document management, report generation, and dynamic barcode implementation. Implemented APIs to streamline system integration, enhancing operational efficiency. Collaborated with internal experts to integrate with third-party providers, and automated bulk data loading to expedite processes. Played a pivotal role in the development of a complex prescription entry system for outpatient care, facilitating efficient dispensing at various levels. Introduced CI/CD practices to optimize software development and deployment.",
    );

    // Verify slide 2 content
    await expect(page.locator("#experience-title-slide-2")).toHaveText(
      "Universidad de La Serena",
    );
    await expect(page.locator("#experience-description-slide-2 h3")).toHaveText(
      "Software Developer",
    );
    await expect(
      page.locator("#experience-description-slide-2 p:nth-child(2)"),
    ).toHaveText("September 2023 - March 2024");
    await expect(
      page.locator("#experience-description-slide-2 p:nth-child(4)"),
    ).toHaveText(
      "Led the development of a comprehensive web platform at the Universidad de La Serena, focusing on water usage, report generation, water delivery management, role-based authentication, water delivery tracking, mobile app API integration, and continuous platform maintenance. Collaborated with multidisciplinary teams to enhance the platform's functionality and security, and implemented CI/CD practices to streamline the development and deployment process.",
    );

    // Verify slide 3 content
    await expect(page.locator("#experience-title-slide-3")).toHaveText(
      "Sixbell",
    );
    await expect(page.locator("#experience-description-slide-3 h3")).toHaveText(
      "Software Engineer",
    );
    await expect(
      page.locator("#experience-description-slide-3 p:nth-child(2)"),
    ).toHaveText("November 2023 - Today");
    await expect(
      page.locator("#experience-description-slide-3 p:nth-child(4)"),
    ).toHaveText(
      "Currently at Sixbell, I am actively involved in exploring new technologies to address challenges and migrate legacy platforms. My work includes developing new modules across various platforms, with a focus on Angular and Java Spring Boot stacks. I have also implemented CI/CD pipelines using GitLab and Docker, enhancing the development and deployment processes. Additionally, I have contributed to business technology solutions, which, due to confidentiality, cannot be disclosed but are crucial for internal operations.",
    );

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
