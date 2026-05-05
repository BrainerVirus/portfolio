# Portfolio Fix & Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** Fix all broken animations and visual bugs, implement two Skills component variants (Bento Grid + Orbital Radial) for user comparison, and add proper E2E test coverage.

**Architecture:** TDD-first: write failing E2E tests for each bug, then fix the code. Skills section gets two interchangeable Astro components. All GSAP animations use `gsap.context()` for proper cleanup. Mobile-first responsive design with `clamp()` typography.

**Tech Stack:** Astro 6.2, React 19, Tailwind CSS v4, GSAP 3.15 (all plugins), Playwright E2E, Vitest unit tests

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `e2e/hero.spec.ts` | Create | E2E: Hero typewriter doesn't overflow, name doesn't break |
| `e2e/work.spec.ts` | Create | E2E: Work cards animate smoothly |
| `e2e/skills.spec.ts` | Create | E2E: All skills visible, no blank space |
| `e2e/contact.spec.ts` | Create | E2E: Form has no green background tint |
| `e2e/navigation.spec.ts` | Create | E2E: Nav scroll-spy correct, mobile menu works |
| `src/components/sections/AboutSection.astro` | Modify | Fix typewriter overflow, mobile name, pinned timeline |
| `src/components/sections/ExperienceSection.astro` | Modify | Fix card jump/glitch — clean scroll-triggered reveals |
| `src/components/sections/SkillsBento.astro` | Create | Option A: Bento grid with 3D flip entrance |
| `src/components/sections/SkillsOrbital.astro` | Create | Option B: Orbital radial constellation |
| `src/components/sections/SkillsSection.astro` | Modify | Toggle between Bento/Orbital via prop/flag |
| `src/components/react/ContactForm.tsx` | Modify | Remove ALL shadcn card remnants, pure HTML form |
| `src/components/sections/ContactSection.astro` | Modify | Remove scoped style hacks, clean split layout |
| `src/components/Header.astro` | Modify | Fix nav scroll-spy, smooth underline, mobile menu GSAP |
| `src/styles/global.css` | Modify | Add `clamp()` typography utilities, 3D transform utilities |

---

## Phase 1: Write Failing E2E Tests (TDD)

### Task 1: Hero Typewriter Test

**Files:**
- Create: `e2e/hero.spec.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { test, expect } from "@playwright/test"

test.describe("Hero Section", () => {
	test("typewriter completes without text overflow", async ({ page }) => {
		await page.goto("/en/")
		const bioContainer = page.locator(".bio-container")
		await expect(bioContainer).toBeVisible()

		// Wait for scramble animation to complete (max 3s)
		await page.waitForTimeout(3000)

		// Check no text is clipped horizontally
		const isClipped = await bioContainer.evaluate((el) => {
			return el.scrollWidth > el.clientWidth
		})
		expect(isClipped).toBe(false)

		// Check all bio lines are fully visible (not truncated)
		const lines = page.locator(".bio-line")
		for (const line of await lines.all()) {
			const box = await line.boundingBox()
			expect(box!.width).toBeGreaterThan(0)
		}
	})

	test("hero name does not break on mobile viewport", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 })
		await page.goto("/en/")
		const name = page.locator(".about-name")
		await expect(name).toBeVisible()

		const box = await name.boundingBox()
		// Name should be roughly one line height (not broken into multiple)
		expect(box!.height).toBeLessThan(120)
	})
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:e2e --grep "Hero Section"`
Expected: FAIL — typewriter text overflows, name breaks on mobile

---

### Task 2: Work Cards Test

**Files:**
- Create: `e2e/work.spec.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { test, expect } from "@playwright/test"

test.describe("Work Section", () => {
	test("all work cards are visible after scroll", async ({ page }) => {
		await page.goto("/en/")
		const cards = page.locator(".experience-entry")

		// Scroll to work section
		await page.evaluate(() => {
			document.getElementById("experience")?.scrollIntoView({ behavior: "instant" })
		})
		await page.waitForTimeout(1500)

		// All 4 cards should be visible
		const count = await cards.count()
		expect(count).toBe(4)

		for (const card of await cards.all()) {
			await expect(card).toBeVisible()
			const box = await card.boundingBox()
			expect(box!.width).toBeGreaterThan(0)
			expect(box!.height).toBeGreaterThan(0)
		}
	})

	test("work cards do not jump during animation", async ({ page }) => {
		await page.goto("/en/")
		await page.evaluate(() => {
			document.getElementById("experience")?.scrollIntoView({ behavior: "instant" })
		})

		// Take screenshots at intervals and compare positions
		const card = page.locator(".experience-entry").first()
		await page.waitForTimeout(500)
		const pos1 = await card.boundingBox()
		await page.waitForTimeout(500)
		const pos2 = await card.boundingBox()

		// Position should be stable (not jumping)
		expect(Math.abs(pos2!.y - pos1!.y)).toBeLessThan(10)
	})
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:e2e --grep "Work Section"`
Expected: FAIL — cards jump, some not visible

---

### Task 3: Skills Visibility Test

**Files:**
- Create: `e2e/skills.spec.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { test, expect } from "@playwright/test"

test.describe("Skills Section", () => {
	test("all 18 skills are visible in grid", async ({ page }) => {
		await page.goto("/en/")
		await page.evaluate(() => {
			document.getElementById("skills")?.scrollIntoView({ behavior: "instant" })
		})
		await page.waitForTimeout(1500)

		const cards = page.locator(".skill-card")
		const count = await cards.count()
		expect(count).toBe(18)

		for (const card of await cards.all()) {
			await expect(card).toBeVisible()
		}
	})

	test("no blank space in skills section", async ({ page }) => {
		await page.goto("/en/")
		const section = page.locator("#skills")
		await page.evaluate(() => {
			document.getElementById("skills")?.scrollIntoView({ behavior: "instant" })
		})
		await page.waitForTimeout(1500)

		const box = await section.boundingBox()
		// Section should have reasonable height (not collapsed)
		expect(box!.height).toBeGreaterThan(400)
	})
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:e2e --grep "Skills Section"`
Expected: FAIL — only 1-3 cards visible, section collapsed

---

### Task 4: Contact Form Test

**Files:**
- Create: `e2e/contact.spec.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { test, expect } from "@playwright/test"

test.describe("Contact Section", () => {
	test("form has no green background tint", async ({ page }) => {
		await page.goto("/en/")
		await page.evaluate(() => {
			document.getElementById("contact")?.scrollIntoView({ behavior: "instant" })
		})

		const form = page.locator("#contact-form")
		const bg = await form.evaluate((el) => {
			return window.getComputedStyle(el).backgroundColor
		})
		// Should be transparent or very dark, not green
		expect(bg).not.toContain("58, 122, 77") // No forest green in rgba
	})

	test("form inputs are underlined only", async ({ page }) => {
		await page.goto("/en/")
		await page.evaluate(() => {
			document.getElementById("contact")?.scrollIntoView({ behavior: "instant" })
		})

		const input = page.locator("#contact-form input").first()
		const borderTop = await input.evaluate((el) => {
			const s = window.getComputedStyle(el)
			return s.borderTopWidth
		})
		// Bottom border only = top border should be 0px
		expect(borderTop).toBe("0px")
	})
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:e2e --grep "Contact Section"`
Expected: FAIL — green background visible, inputs have full border

---

### Task 5: Navigation Test

**Files:**
- Create: `e2e/navigation.spec.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
	test("clicking contact highlights contact correctly", async ({ page }) => {
		await page.goto("/en/")
		const contactLink = page.locator('header nav a[href="#contact"]')
		await contactLink.click()
		await page.waitForTimeout(800)

		// Should have active/white styling
		const color = await contactLink.evaluate((el) => {
			return window.getComputedStyle(el).color
		})
		expect(color).toContain("240, 230, 210") // #f0e6d2
	})

	test("mobile menu opens with animation", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 })
		await page.goto("/en/")

		const menuBtn = page.locator("#mobile-menu-btn")
		await menuBtn.click()
		await page.waitForTimeout(500)

		const mobileMenu = page.locator("#mobile-menu")
		await expect(mobileMenu).toBeVisible()
	})
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:e2e --grep "Navigation"`
Expected: FAIL — nav highlights wrong section, mobile menu no animation

---

## Phase 2: Fix Hero Section

### Task 6: Fix Hero Typewriter Overflow

**Files:**
- Modify: `src/components/sections/AboutSection.astro`

**Root Cause:** `ScrambleTextPlugin` manipulates `textContent` directly. Long lines like "Building scalable systems and drinking dark roast." exceed container width during scramble because the container shrinks to fit.

**Fix:** Replace ScrambleText with a custom typewriter that:
1. Pre-measures text and sets `min-height` on container
2. Uses `word-break: break-word` and `white-space: pre-wrap`
3. Types character-by-character into a fixed-width container
4. Scramble effect applied only to the character being typed, not the whole line

- [ ] **Step 1: Modify bio container HTML**

Add `bio-container` class with `min-height`, `overflow-wrap: break-word`, `word-break: break-word`:

```astro
<div class="bio-container mx-auto mt-16 max-w-2xl" style="min-height: 200px;">
  <div class="code-block relative p-8 font-mono text-sm leading-relaxed"
       style="border-color: rgba(240,230,210,0.06); color: #a89a84; overflow-wrap: break-word; word-break: break-word;">
```

- [ ] **Step 2: Replace scramble with custom typewriter**

```typescript
const bioLines = document.querySelectorAll(".bio-line")
const chars = "▪░▒▓█"

bioLines.forEach((line, i) => {
  const originalHTML = line.innerHTML
  const text = line.textContent || ""
  line.textContent = ""

  // Typewriter with per-character scramble
  const obj = { val: 0 }
  tl.to(obj, {
    val: text.length,
    duration: text.length * 0.02,
    ease: "none",
    onUpdate: () => {
      const n = Math.floor(obj.val)
      let result = text.substring(0, n)
      // Add scramble char for current position
      if (n < text.length) {
        result += chars[Math.floor(Math.random() * chars.length)]
      }
      line.textContent = result
    },
    onComplete: () => {
      line.innerHTML = originalHTML
    },
  }, 0.3 + i * 0.08)
})
```

- [ ] **Step 3: Run hero tests**

Run: `pnpm test:e2e --grep "Hero Section"`
Expected: PASS

---

### Task 7: Fix Mobile Name Break

**Files:**
- Modify: `src/components/sections/AboutSection.astro`

**Root Cause:** `text-7xl md:text-8xl lg:text-9xl` breaks on mobile because `9xl` is too large for 375px viewport.

**Fix:** Use `clamp()` for fluid typography.

- [ ] **Step 1: Replace fixed sizes with clamp**

```astro
<h1 class="about-name font-light tracking-tighter text-[#f0e6d2]"
    style="font-size: clamp(2.5rem, 10vw, 8rem); line-height: 1.1;">
```

- [ ] **Step 2: Add responsive padding**

```astro
<div class="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
```

- [ ] **Step 3: Run hero mobile test**

Run: `pnpm test:e2e --grep "hero name does not break"`
Expected: PASS

---

## Phase 3: Fix Work Section

### Task 8: Fix Work Card Animations

**Files:**
- Modify: `src/components/sections/ExperienceSection.astro`

**Root Cause:** `ScrollTrigger.batch()` + parallax `x` offset creates conflicting tweens. Batch fires once, but the parallax `fromTo` creates a second tween on the same element, causing jump.

**Fix:** Remove batch + parallax combo. Use simple `gsap.from()` with individual ScrollTrigger per card.

- [ ] **Step 1: Remove batch and parallax, use simple from**

```typescript
const entries = document.querySelectorAll(".experience-entry")
entries.forEach((entry, i) => {
  gsap.from(entry, {
    y: 60,
    opacity: 0,
    duration: 0.7,
    delay: i * 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: entry,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  })
})
```

- [ ] **Step 2: Remove parallax background shapes (or simplify)**

Keep background shapes but animate with CSS `transform: translateY()` tied to scroll via a single ScrollTrigger, not per-shape.

- [ ] **Step 3: Run work tests**

Run: `pnpm test:e2e --grep "Work Section"`
Expected: PASS

---

## Phase 4: Build Skills Option A — Bento Grid

### Task 9: Create SkillsBento Component

**Files:**
- Create: `src/components/sections/SkillsBento.astro`

**Design:**
- Asymmetric masonry grid: 2 large cards (core skills), 4 medium (secondary), 12 small (additional)
- Grid: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6`
- Large cards span 2 cols, medium span 1, small span 1
- Cards have glassmorphism: `bg-[#141a14]/60 backdrop-blur-sm border border-[#f0e6d2]/6`
- On scroll: cards flip in from 3D perspective (`rotationX: 90 → 0`, `opacity: 0 → 1`)
- Stagger: `0.05s` per card
- Hover: card lifts `translateY: -8px`, border glows `border-[#3a7a4d]/40`, icon scales `1.1`
- Progress bar at bottom of each card

- [ ] **Step 1: Create component with grid layout**

```astro
<section class="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24" id="skills">
  <div class="mb-16">
    <h2 class="skills-heading text-4xl font-medium tracking-tight text-[#f0e6d2] md:text-5xl">
      {t("skills.title")}
    </h2>
    <p class="mt-4 max-w-xl text-lg text-[#a89a84]">{t("skills.subtitle")}</p>
  </div>

  <div class="skills-grid grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
    <!-- Core skills: large cards, span 2 cols on desktop -->
    {coreSkills.map((skill) => (
      <div class="skill-card group col-span-2 rounded-xl border border-[#f0e6d2]/6 bg-[#141a14]/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#3a7a4d]/40">
        <Icon name={skill.icon} class="h-10 w-10 text-[#f0e6d2] transition-transform duration-300 group-hover:scale-110" />
        <div class="mt-3 text-sm font-medium text-[#f0e6d2]">{t(skill.translationKey)}</div>
        <div class="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#f0e6d2]/10">
          <div class="skill-progress h-full rounded-full bg-[#3a7a4d]" style={`width: 0%;`} data-mastery={skill.mastery}></div>
        </div>
      </div>
    ))}
    <!-- Secondary + Additional: regular cards -->
    {[...secondarySkills, ...additionalSkills].map((skill) => (
      <div class="skill-card group rounded-xl border border-[#f0e6d2]/6 bg-[#141a14]/60 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#3a7a4d]/40">
        <Icon name={skill.icon} class="h-8 w-8 text-[#f0e6d2] transition-transform duration-300 group-hover:scale-110" />
        <div class="mt-2 text-sm font-medium text-[#f0e6d2]">{t(skill.translationKey)}</div>
        <div class="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#f0e6d2]/10">
          <div class="skill-progress h-full rounded-full bg-[#3a7a4d]" style={`width: 0%;`} data-mastery={skill.mastery}></div>
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Add GSAP 3D flip entrance**

```typescript
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const cards = document.querySelectorAll(".skill-card")
cards.forEach((card, i) => {
  gsap.from(card, {
    rotationX: 90,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.05,
    ease: "power3.out",
    transformPerspective: 1000,
    transformOrigin: "center top",
    scrollTrigger: {
      trigger: card,
      start: "top 95%",
      toggleActions: "play none none none",
    },
  })

  // Progress bar animation
  const progress = card.querySelector(".skill-progress")
  if (progress) {
    const mastery = parseInt(progress.getAttribute("data-mastery") || "0")
    gsap.to(progress, {
      width: `${mastery}%`,
      duration: 0.8,
      delay: i * 0.05 + 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    })
  }
})
```

- [ ] **Step 3: Run skills tests**

Run: `pnpm test:e2e --grep "Skills Section"`
Expected: PASS

---

## Phase 5: Build Skills Option B — Orbital Radial

### Task 10: Create SkillsOrbital Component

**Files:**
- Create: `src/components/sections/SkillsOrbital.astro`

**Design:**
- Skills arranged in concentric rings around a center label
- Center: "Skills" text or icon
- Inner ring (4): Core skills, largest icons
- Middle ring (6): Secondary skills, medium icons
- Outer ring (8): Additional skills, small icons
- Each ring rotates slowly in opposite directions (CSS animation)
- Scroll-triggered: rings expand from center (`scale: 0 → 1`, `opacity: 0 → 1`)
- Hover on a skill: it pauses rotation, scales up, shows tooltip with name + mastery

- [ ] **Step 1: Create component with orbital rings**

```astro
<section class="relative mx-auto flex max-w-7xl scroll-mt-24 items-center justify-center overflow-hidden px-6 py-24" id="skills">
  <div class="mb-16 absolute top-12 left-6 z-10">
    <h2 class="skills-heading text-4xl font-medium tracking-tight text-[#f0e6d2] md:text-5xl">
      {t("skills.title")}
    </h2>
    <p class="mt-4 max-w-xl text-lg text-[#a89a84]">{t("skills.subtitle")}</p>
  </div>

  <div class="orbit-container relative flex h-[500px] w-[500px] items-center justify-center md:h-[600px] md:w-[600px]">
    <!-- Center -->
    <div class="absolute z-10 text-center">
      <span class="material-symbols-outlined text-4xl text-[#3a7a4d]">token</span>
      <div class="mt-2 font-mono text-xs tracking-widest text-[#6b6055] uppercase">Skills</div>
    </div>

    <!-- Inner ring -->
    <div class="orbit-ring inner-ring absolute h-[200px] w-[200px] rounded-full border border-[#3a7a4d]/20 md:h-[240px] md:w-[240px]">
      {coreSkills.map((skill, i) => {
        const angle = (i * 360) / coreSkills.length
        return (
          <div class="orbit-item absolute" style={`transform: rotate(${angle}deg) translateY(-100px) rotate(-${angle}deg);`}>
            <div class="skill-card group flex h-14 w-14 flex-col items-center justify-center rounded-full border border-[#f0e6d2]/10 bg-[#141a14]/80 backdrop-blur-sm transition-all duration-300 hover:scale-125 hover:border-[#3a7a4d]/60">
              <Icon name={skill.icon} class="h-6 w-6 text-[#f0e6d2]" />
            </div>
          </div>
        )
      })}
    </div>

    <!-- Middle ring -->
    <div class="orbit-ring middle-ring absolute h-[340px] w-[340px] rounded-full border border-[#3a7a4d]/15 md:h-[400px] md:w-[400px]">
      {secondarySkills.map((skill, i) => {
        const angle = 30 + (i * 360) / secondarySkills.length
        return (
          <div class="orbit-item absolute" style={`transform: rotate(${angle}deg) translateY(-170px) rotate(-${angle}deg);`}>
            <div class="skill-card group flex h-12 w-12 flex-col items-center justify-center rounded-full border border-[#f0e6d2]/10 bg-[#141a14]/80 backdrop-blur-sm transition-all duration-300 hover:scale-125 hover:border-[#3a7a4d]/60">
              <Icon name={skill.icon} class="h-5 w-5 text-[#f0e6d2]" />
            </div>
          </div>
        )
      })}
    </div>

    <!-- Outer ring -->
    <div class="orbit-ring outer-ring absolute h-[460px] w-[460px] rounded-full border border-[#3a7a4d]/10 md:h-[560px] md:w-[560px]">
      {additionalSkills.map((skill, i) => {
        const angle = 15 + (i * 360) / additionalSkills.length
        return (
          <div class="orbit-item absolute" style={`transform: rotate(${angle}deg) translateY(-230px) rotate(-${angle}deg);`}>
            <div class="skill-card group flex h-10 w-10 flex-col items-center justify-center rounded-full border border-[#f0e6d2]/10 bg-[#141a14]/80 backdrop-blur-sm transition-all duration-300 hover:scale-125 hover:border-[#3a7a4d]/60">
              <Icon name={skill.icon} class="h-4 w-4 text-[#f0e6d2]" />
            </div>
          </div>
        )
      })}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add CSS rotation and GSAP entrance**

```astro
<style>
  .orbit-ring {
    animation: orbit-rotate 60s linear infinite;
  }
  .middle-ring {
    animation-direction: reverse;
    animation-duration: 80s;
  }
  .outer-ring {
    animation-duration: 100s;
  }
  .orbit-container:hover .orbit-ring {
    animation-play-state: paused;
  }
  @keyframes orbit-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>

<script>
  import gsap from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  gsap.registerPlugin(ScrollTrigger)

  const rings = document.querySelectorAll(".orbit-ring")
  rings.forEach((ring, i) => {
    gsap.from(ring, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  })

  const items = document.querySelectorAll(".orbit-item")
  items.forEach((item, i) => {
    gsap.from(item.querySelector(".skill-card"), {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      delay: i * 0.03,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  })
</script>
```

- [ ] **Step 3: Run skills tests**

Run: `pnpm test:e2e --grep "Skills Section"`
Expected: PASS

---

## Phase 6: Fix Contact Form

### Task 11: Remove Shadcn Card Remnants from ContactForm

**Files:**
- Modify: `src/components/react/ContactForm.tsx`

**Root Cause:** The form still imports and uses shadcn `Card`, `CardHeader`, `CardContent`, `CardTitle` components. Even though the ContactSection tries to hide them with CSS, the shadcn theme variables still apply background colors.

**Fix:** Remove ALL shadcn imports. Use plain HTML `<form>`, `<input>`, `<textarea>`, `<button>`.

- [ ] **Step 1: Rewrite ContactForm with pure HTML**

```tsx
"use client"

import { useState } from "react"
import { actions } from "astro:actions"
import { toast } from "sonner"

interface ContactFormProps {
  locale: "en" | "es"
  translations: {
    name: string
    namePlaceholder: string
    email: string
    emailPlaceholder: string
    message: string
    messagePlaceholder: string
    submit: string
    sending: string
    error: {
      nameRequired: string
      emailRequired: string
      emailInvalid: string
      messageRequired: string
      messageMinLength: string
    }
    success: string
    failed: string
    connectionLost: string
  }
}

export default function ContactForm({ locale, translations }: ContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = translations.error.nameRequired
    if (!email.trim()) newErrors.email = translations.error.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = translations.error.emailInvalid
    if (!message.trim()) newErrors.message = translations.error.messageRequired
    else if (message.length < 10) newErrors.message = translations.error.messageMinLength
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      const result = await actions.contact({ name, email, message, locale })
      if (!result.error) {
        toast.success(translations.success)
        setName("")
        setEmail("")
        setMessage("")
        setErrors({})
      } else {
        toast.error(result.error?.message || translations.failed)
      }
    } catch {
      toast.error(translations.connectionLost)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block font-mono text-xs tracking-widest text-[#a89a84] uppercase">
          {translations.name}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrors((prev) => { const n = { ...prev }; delete n.name; return n })
          }}
          placeholder={translations.namePlaceholder}
          className="w-full border-0 border-b border-[#f0e6d2]/12 bg-transparent py-3 text-[#f0e6d2] placeholder-[#6b6055] transition-colors duration-300 focus:border-[#3a7a4d] focus:outline-none"
        />
        {errors.name && <p className="mt-2 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-mono text-xs tracking-widest text-[#a89a84] uppercase">
          {translations.email}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setErrors((prev) => { const n = { ...prev }; delete n.email; return n })
          }}
          placeholder={translations.emailPlaceholder}
          className="w-full border-0 border-b border-[#f0e6d2]/12 bg-transparent py-3 text-[#f0e6d2] placeholder-[#6b6055] transition-colors duration-300 focus:border-[#3a7a4d] focus:outline-none"
        />
        {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-xs tracking-widest text-[#a89a84] uppercase">
          {translations.message}
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            setErrors((prev) => { const n = { ...prev }; delete n.message; return n })
          }}
          placeholder={translations.messagePlaceholder}
          rows={4}
          className="w-full resize-none border-0 border-b border-[#f0e6d2]/12 bg-transparent py-3 text-[#f0e6d2] placeholder-[#6b6055] transition-colors duration-300 focus:border-[#3a7a4d] focus:outline-none"
        />
        {errors.message && <p className="mt-2 text-xs text-red-400">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#3a7a4d] px-8 py-4 text-sm font-bold tracking-widest text-[#f0e6d2] uppercase transition-all duration-300 hover:scale-[1.02] hover:bg-[#4a8a5d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? translations.sending : translations.submit}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Update ContactSection to remove style hacks**

Remove ALL the `<style>` block that overrides shadcn card styles. The form is now pure HTML.

- [ ] **Step 3: Run contact tests**

Run: `pnpm test:e2e --grep "Contact Section"`
Expected: PASS

---

## Phase 7: Fix Navigation

### Task 12: Fix Nav Scroll-Spy and Underline

**Files:**
- Modify: `src/components/Header.astro`

**Root Cause:** Click handler calls `moveToLink()` which animates underline to clicked position. Then IntersectionObserver also fires as scroll settles, calling `moveToLink()` again, causing double-move and wrong highlight.

**Fix:** Remove click handler's `moveToLink()`. Let the observer be the single source of truth. Add smooth scroll behavior to nav links.

- [ ] **Step 1: Remove click handler, keep observer only**

```typescript
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const href = link.getAttribute("href")
    if (href) {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }
  })
})
```

- [ ] **Step 2: Debounce observer updates**

```typescript
let observerTimeout: ReturnType<typeof setTimeout>
scrollObserver = new IntersectionObserver(
  (entries) => {
    clearTimeout(observerTimeout)
    observerTimeout = setTimeout(() => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) {
        const link = document.querySelector(`header nav a[href="#${visible.target.id}"]`)
        if (link) moveToLink(link)
      }
    }, 100)
  },
  { rootMargin: "-30% 0px -70% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
)
```

- [ ] **Step 3: Run navigation tests**

Run: `pnpm test:e2e --grep "Navigation"`
Expected: PASS

---

### Task 13: Add Mobile Menu Micro-interactions

**Files:**
- Modify: `src/components/Header.astro`

**Design:**
- Hamburger icon morphs to X (3 lines → rotate to form X)
- Menu slides down with staggered link reveals
- Background overlay fades in
- Close reverses the animation

- [ ] **Step 1: Add GSAP timeline for mobile menu**

```typescript
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = menuBtn?.querySelector(".material-symbols-outlined")
  const links = mobileMenu?.querySelectorAll("a")

  if (!menuBtn || !mobileMenu || !menuIcon || !links) return

  let isOpen = false
  let menuTl: gsap.core.Timeline | null = null

  function openMenu() {
    isOpen = true
    mobileMenu.classList.remove("hidden")
    menuBtn.setAttribute("aria-expanded", "true")
    menuIcon.textContent = "close"

    menuTl = gsap.timeline()
    menuTl.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
    menuTl.fromTo(links, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }, "-=0.2")
  }

  function closeMenu() {
    isOpen = false
    if (menuTl) {
      menuTl.reverse().then(() => {
        mobileMenu.classList.add("hidden")
        menuBtn.setAttribute("aria-expanded", "false")
        menuIcon.textContent = "menu"
      })
    }
  }

  menuBtn.addEventListener("click", () => {
    isOpen ? closeMenu() : openMenu()
  })

  links.forEach((link) => {
    link.addEventListener("click", () => closeMenu())
  })
}
```

- [ ] **Step 2: Run navigation tests**

Run: `pnpm test:e2e --grep "mobile menu"`
Expected: PASS

---

## Phase 8: Final Verification

### Task 14: Run All Tests

- [ ] **Step 1: Run E2E suite**

Run: `pnpm test:e2e`
Expected: All tests pass

- [ ] **Step 2: Run unit tests**

Run: `pnpm test:unit`
Expected: All tests pass

- [ ] **Step 3: Run lint + format + type check**

Run: `pnpm lint && pnpm format:check && pnpm check`
Expected: All pass

- [ ] **Step 4: Build for production**

Run: `pnpm build`
Expected: Build succeeds with no errors

---

## Self-Review

**Spec coverage:**
- Hero typewriter overflow → Task 6
- Mobile name break → Task 7
- Work card jump → Task 8
- Skills broken → Tasks 9-10 (two options)
- Contact green background → Task 11
- Nav scroll-spy → Task 12
- Mobile menu → Task 13
- Tests → Tasks 1-5

**Placeholder scan:** No TBDs, no placeholders. All code is complete.

**Type consistency:** Translation keys (`name`, `email`, `message`) match across `ContactForm.tsx`, `en.ts`, `es.ts`, and `ContactSection.astro`.

---

**Plan saved to:** `docs/superpowers/plans/2026-05-02-portfolio-fixes.md`

**Execution options:**
1. **Subagent-Driven** — Dispatch fresh subagent per task, review between tasks
2. **Inline Execution** — Execute tasks in this session with checkpoints

Which approach do you prefer?