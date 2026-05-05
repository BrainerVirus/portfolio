# Portfolio Cinematic Rebuild — Design Spec

> **Date:** 2026-05-02
> **Project:** Personal Portfolio — Cinematic Scroll Storytelling v2
> **Goal:** Transform the portfolio into a cinematic, scroll-driven experience with section pinning, horizontal scroll, parallax depth layers, and full GSAP plugin suite.

---

## 1. Visual System

### Color Palette

| Token | Hex / Value | Usage |
|---|---|---|
| `--bg-primary` | `#0a0e0a` | Page background |
| `--bg-surface` | `#141a14` | Cards, elevated surfaces |
| `--accent-forest` | `#3a7a4d` | Primary accent, hover states, active underline |
| `--accent-glow` | `#4a9a6d` | Brighter forest for glows, focus states |
| `--text-primary` | `#f0e6d2` | Headings, primary text |
| `--text-secondary` | `#a89a84` | Body copy, descriptions |
| `--text-muted` | `#6b6055` | Timestamps, labels, footnotes |
| `--border-subtle` | `rgba(240, 230, 210, 0.06)` | Default borders |
| `--border-hover` | `rgba(58, 122, 77, 0.4)` | Forest-tinted borders on hover |

### Typography

- **Display** (`Satoshi`, `font-light`, `tracking-tighter`):
  - Hero name: `text-7xl md:text-8xl lg:text-9xl`
  - Section headings: `text-4xl md:text-5xl`, `font-medium`, `tracking-tight`
- **Body** (`Satoshi`, `font-light`, `leading-relaxed`):
  - Body copy: `text-base md:text-lg`, `text-secondary`, `leading-[1.7]`
- **Mono** (`JetBrains Mono`, `text-xs`, `tracking-widest`, `uppercase`):
  - Labels, roles, timestamps, tags

### Spacing & Composition

- Section vertical padding: `py-32` to `py-48`
- Asymmetric layouts: `60/40`, `70/30` splits
- Content max-width: `max-w-7xl`
- Generous whitespace

### Background

- Solid `#0a0e0a` with one ultra-subtle radial gradient at top center:
  ```css
  radial-gradient(ellipse at 50% 0%, rgba(58, 122, 77, 0.04), transparent 60%)
  ```

---

## 2. Scroll Choreography

| Section | Behavior | Scroll Distance | Key Effect |
|---|---|---|---|
| **Hero** | **Pinned** | ~150vh | Content reveals in sequence while pinned. At end, hero scales down and fades to reveal Experience underneath |
| **Experience** | **Flowing + Parallax** | Natural | Entries slide up with stagger. Background shapes move at 0.3x speed. Left/right columns have slight offset |
| **Skills** | **Pinned Horizontal** | ~200vh | Section pins. Vertical scroll converts to horizontal card scroll. Cards reveal from right. Progress bars scrub to width |
| **Contact** | **Flowing + Parallax** | Natural | Split layout. Gradient blob moves at 0.5x speed. Form fields reveal with stagger |

---

## 3. Section Architecture

### Hero (Bio) — `#about`

**Layout:**
- Full viewport height on first load (`min-h-screen`)
- Massive display name: `Cristhofer Pincetti`, sand color, `tracking-tighter`
- Mono subtitle below: "Full Stack Engineer", `text-xs`, `tracking-[0.3em]`, muted
- Bio code block: Clean bordered rectangle (not faux macOS terminal)
- Thin `1px` sand cursor that blinks with CSS `blink`
- Decorative SVG circle (DrawSVG)

**Scroll Behavior (Pinned):**
- Section pins at `top top` for `end: "+=150%"`
- Sequence:
  1. `0-20%`: Name reveals (SplitText chars, `y: 100% → 0`, stagger `0.02`)
  2. `20-30%`: Subtitle fades in
  3. `30-70%`: Bio scrambles line by line (ScrambleText, `duration = text.length * 0.02`)
  4. `70-90%`: Decorative circle draws (DrawSVG)
  5. `90-100%`: Hero scales to `0.95` and fades to `0.5`

**Fixes from v1:**
- Typewriter speed: `text.length * 0.02` (was `0.04`)
- Container: `overflow-wrap: break-word`, proper padding
- Text won't overflow

### Experience — `#experience`

**Layout:**
- Section heading: "Work" (not "Mission Log")
- Subtitle: "Places I've built things."
- Vertical stack of full-width entries
- Each entry row: Left (company + role), Right (period + description + tags)
- Tags: small mono labels with subtle border, no pill shapes

**Scroll Animations:**
- Section heading: SplitText lines reveal with mask
- Entries: `ScrollTrigger.batch()`, `y: 60 → 0`, `opacity: 0 → 1`, stagger `0.12`
- Parallax: Odd entries shift `x: -20 → 0`, even `x: 20 → 0`
- Background: 2-3 geometric shapes moving at `0.2x` scroll speed

**Hover:**
- Entry lifts `translateY: -6px`
- Left border glow: `border-l-2 border-[#3a7a4d]/60`
- Shadow: `0 10px 40px rgba(0,0,0,0.3)`

### Skills — `#skills`

**Layout:**
- Section heading: "Skills" (not "Technical Arsenal")
- Subtitle: "What I work with."
- Horizontal card layout (driven by scroll, not grid)
- Each card: icon, name, progress bar

**Scroll Behavior (Pinned Horizontal):**
- Section pins at `top top` for `end: "+=200%"`
- Vertical scroll drives horizontal movement
- Cards arranged horizontally off-screen to the right
- As user scrolls, cards slide in from right with stagger

**Animations:**
- Cards: `x: 100 → 0`, `opacity: 0 → 1`, stagger `0.08`
- Progress bars: Width animates from `0%` to `mastery%`
- Background: Forest gradient blob morphs shape slowly

**Hover:**
- Card scales `1.05`
- Icon rotates `8deg`
- Forest glow intensifies

### Contact — `#contact`

**Layout — Split 50/50:**
- Left:
  - Heading: "Contact"
  - Subheading: "Let's talk."
  - Social links: GitHub, LinkedIn
- Right:
  - Minimal form: Name, Email, Message
  - Underlined inputs only (no background, no border box)
  - Forest green underline on focus
  - Button: "Send message" — forest green, hover scales `1.02`

**Scroll Animations:**
- Left content: `x: -40 → 0`, `opacity: 0 → 1`
- Right content: `x: 40 → 0`, `opacity: 0 → 1`, delay `0.2`
- Gradient blob behind form: Parallax at `0.5x` speed

---

## 4. Copy Updates (Direct & Confident)

| Current | New |
|---|---|
| "The Pilot's Log" | (Remove) |
| "Mission Log" | "Work" |
| "Detailed technical trajectory..." | "Places I've built things." |
| "Technical Arsenal" | "Skills" |
| "Core systems and satellite technologies..." | "What I work with." |
| "Establish Comm Link" | "Contact" |
| "Initiate sub-space transmission..." | "Let's talk." |
| "Send Data Burst" | "Send message" |
| Sci-fi form labels | "Name", "Email", "Message" |

---

## 5. Animation Choreography (GSAP)

### Global Easing

```javascript
const editorialEase = CustomEase.create("editorial", "0.65, 0.05, 0.36, 1")
```

### Hero Timeline (Pinned)

```javascript
const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#about",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: 1
  }
})

// 0-20%: Name reveal
heroTl.from(splitName.chars, { y: "100%", opacity: 0, stagger: 0.02 }, 0)

// 20-30%: Subtitle
heroTl.from(".about-subtitle", { opacity: 0, y: 20 }, 0.2)

// 30-70%: Bio scramble
heroTl.to(bioLines[0], { scrambleText: { text: "...", chars: "▪░▒▓█" } }, 0.3)
// ... etc

// 90-100%: Hero exit
heroTl.to("#about", { scale: 0.95, opacity: 0.5 }, 0.9)
```

### Experience Batch

```javascript
ScrollTrigger.batch(".experience-entry", {
  start: "top 85%",
  onEnter: (batch) => {
    gsap.fromTo(batch, 
      { opacity: 0, y: 60 }, 
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
    )
  }
})
```

### Skills Horizontal Scroll

```javascript
const skillsTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#skills",
    start: "top top",
    end: "+=200%",
    pin: true,
    scrub: 1
  }
})

skillsTl.to(".skills-container", { x: () => -(containerWidth - viewportWidth), ease: "none" })
```

### Parallax Elements

```javascript
gsap.to(".parallax-bg", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
})
```

---

## 6. Files to Modify / Create

| File | Action | Responsibility |
|---|---|---|
| `src/styles/global.css` | Modify | Updated utilities for pinned sections, horizontal scroll |
| `src/lib/animations.ts` | Modify | New utilities: pinned timelines, horizontal scroll, parallax |
| `src/components/sections/AboutSection.astro` | Rewrite | Pinned hero with sequence timeline |
| `src/components/sections/ExperienceSection.astro` | Rewrite | Parallax entries, batch reveals |
| `src/components/sections/SkillsSection.astro` | Rewrite | Pinned horizontal scroll |
| `src/components/sections/ContactSection.astro` | Rewrite | Split layout, elegant form, parallax blob |
| `src/components/react/ContactForm.tsx` | Rewrite | No card, underlined inputs, forest button |
| `src/components/Header.astro` | Modify | Thinner glass, scroll behavior |
| `src/components/Footer.astro` | Modify | Minimal |
| `src/i18n/locales/en.ts` | Modify | Updated copy |
| `src/i18n/locales/es.ts` | Modify | Updated copy |

---

## 7. Tech Stack

- **Astro 6.2** with SSR
- **React 19** (ContactForm only)
- **Tailwind CSS v4**
- **GSAP 3.15** + ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase
- **Satoshi** + **JetBrains Mono** fonts

---

## 8. Performance Notes

- `will-change: transform` on animated elements
- `gsap.matchMedia()` for responsive behavior
- Respect `prefers-reduced-motion`
- Kill ScrollTriggers on `astro:after-swap`
