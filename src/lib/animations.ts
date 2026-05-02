import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
			ease: "power3.out",
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
			ease: "power2.out",
			scrollTrigger: {
				trigger: parent,
				start: "top 80%",
				toggleActions: "play none none none",
			},
		}
	)
}
