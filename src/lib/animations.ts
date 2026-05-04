import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase)

/**
 * Editorial custom ease for sophisticated motion
 */
export const editorialEase = CustomEase.create("editorial", "0.65, 0.05, 0.36, 1")

/**
 * Kill all ScrollTrigger instances to prevent accumulation on re-init.
 */
export function cleanupScrollTriggers() {
	ScrollTrigger.killAll()
}

/**
 * Fade-in up animation for section content
 */
export function fadeInUp(element: gsap.DOMTarget, delay = 0) {
	gsap.fromTo(
		element,
		{ opacity: 0, y: 40 },
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			delay,
			ease: editorialEase,
			scrollTrigger: {
				trigger: element instanceof Element ? element : undefined,
				start: "top 85%",
				toggleActions: "play none none none",
			},
		}
	)
}

/**
 * Stagger fade-in for multiple children
 */
export function staggerFadeIn(parent: Element, childSelector: string, staggerAmount = 0.15) {
	const children = parent.querySelectorAll(childSelector)
	gsap.fromTo(
		children,
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			stagger: staggerAmount,
			ease: editorialEase,
			scrollTrigger: {
				trigger: parent,
				start: "top 80%",
				toggleActions: "play none none none",
			},
		}
	)
}

/**
 * SplitText reveal animation — characters or lines
 */
export function splitTextReveal(
	element: Element,
	options: { type?: "chars" | "words" | "lines" | "chars,words,lines"; mask?: boolean } = {}
) {
	const { type = "chars", mask = false } = options

	const split = SplitText.create(element, {
		type,
		...(mask ? { mask: type.includes("lines") ? "lines" : "words" } : {}),
		charsClass: "split-char",
		wordsClass: "split-word",
		linesClass: "split-line",
	})

	const targets =
		type === "lines" ? split.lines : type.includes("chars") ? split.chars : split.words

	gsap.fromTo(
		targets,
		{ opacity: 0, y: 100 },
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			stagger: 0.02,
			ease: "power3.out",
			scrollTrigger: {
				trigger: element,
				start: "top 80%",
				toggleActions: "play none none none",
			},
		}
	)

	return split
}

/**
 * Scramble text typewriter effect using ScrambleTextPlugin
 */
export function scrambleTypewriter(
	lines: HTMLElement[],
	cursor: HTMLElement | null,
	options: { speed?: number; pauseBetween?: number; chars?: string } = {}
) {
	const { speed = 0.3, pauseBetween = 0.4, chars = "▪░▒▓█" } = options

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: lines[0]?.closest(".code-block") || lines[0],
			start: "top 80%",
			once: true,
		},
	})

	lines.forEach((line, i) => {
		const originalText = line.textContent || ""
		line.textContent = ""

		// Show cursor before typing
		if (cursor && i === 0) {
			tl.set(cursor, { opacity: 1 })
		}

		// Scramble reveal
		tl.to(line, {
			duration: originalText.length * 0.04,
			scrambleText: {
				text: originalText,
				chars,
				revealDelay: 0,
				speed,
			},
			ease: "none",
		})

		// Pause between lines
		if (i < lines.length - 1) {
			tl.to({}, { duration: pauseBetween })
		}
	})

	return tl
}

/**
 * Batch reveal using ScrollTrigger.batch for efficient group animations
 */
export function batchReveal(
	selector: string,
	options: {
		trigger?: string | Element
		start?: string
		from?: gsap.TweenVars
		to?: gsap.TweenVars
		stagger?: number
	} = {}
) {
	const {
		start = "top 85%",
		from = { opacity: 0, y: 50 },
		to = { opacity: 1, y: 0, duration: 0.7, ease: editorialEase },
		stagger = 0.1,
	} = options

	ScrollTrigger.batch(selector, {
		start,
		onEnter: (batch) => {
			gsap.fromTo(batch, from, { ...to, stagger })
		},
	})
}

/**
 * DrawSVG animation for decorative elements
 */
export function drawSVGReveal(
	element: string | Element,
	options: { duration?: number; delay?: number; trigger?: string | Element } = {}
) {
	const { duration = 2, delay = 0, trigger } = options

	gsap.fromTo(
		element,
		{ drawSVG: "0%" },
		{
			drawSVG: "100%",
			duration,
			delay,
			ease: "power2.inOut",
			scrollTrigger: {
				trigger: trigger || element,
				start: "top 80%",
				toggleActions: "play none none none",
			},
		}
	)
}

/**
 * Nav underline animation with CustomEase
 */
export function animateNavUnderline(
	underline: HTMLElement,
	left: number,
	width: number,
	duration = 0.5
) {
	gsap.to(underline, {
		left,
		width,
		duration,
		ease: editorialEase,
		overwrite: "auto",
	})
}

/**
 * 3D card tilt effect — cards follow cursor with rotation on both axes.
 * Uses gsap.quickSetter piped to all cards, driven by gsap.ticker (60fps).
 * Mouse position smoothed with inertia for organic feel.
 *
 * Reference: https://codepen.io/ryan_labar/pen/xxRBYYM
 */
export function initCardTilt(
	container: Element,
	options: {
		maxTilt?: number
		cardSelector?: string
		speed?: number
	} = {}
): () => void {
	if (!container) return () => {}

	const { maxTilt = 30, cardSelector = ".experience-entry", speed = 0.1 } = options
	const cards = container.querySelectorAll(cardSelector) as NodeListOf<HTMLElement>
	if (cards.length === 0) return () => {}

	// Enable 3D rendering on all cards
	cards.forEach((card) => {
		card.style.transformStyle = "preserve-3d"
	})

	// One quickSetter piped to all cards — more efficient than per-card setters
	const xSet = gsap.utils.pipe(gsap.quickSetter(cards, "rotationY", "deg") as any)
	const ySet = gsap.utils.pipe(gsap.quickSetter(cards, "rotationX", "deg") as any)

	// Mouse tracking with smoothed inertia
	const wW = window.innerWidth
	const wH = window.innerHeight
	const mouse = { x: wW / 2, y: wH / 2 }
	const pos = { x: mouse.x, y: mouse.y }

	const onMouseMove = (e: MouseEvent) => {
		mouse.x = e.clientX
		mouse.y = e.clientY
	}

	const tilt = () => {
		const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())
		pos.x += (mouse.x - pos.x) * dt
		pos.y += (mouse.y - pos.y) * dt
		xSet((gsap.utils.normalize(0, wW, pos.x) - 0.5) * maxTilt)
		ySet((gsap.utils.normalize(0, wH, pos.y) - 0.5) * -maxTilt)
	}

	window.addEventListener("mousemove", onMouseMove)
	gsap.ticker.add(tilt)

	return () => {
		window.removeEventListener("mousemove", onMouseMove)
		gsap.ticker.remove(tilt)
		// Reset cards to neutral
		gsap.set(cards, { rotationX: 0, rotationY: 0 })
	}
}
