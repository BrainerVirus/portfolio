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
