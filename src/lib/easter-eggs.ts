import gsap from "gsap"
import { toast } from "sonner"

// Konami code sequence
const KONAMI_CODE = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"KeyB",
	"KeyA",
]

let cleanupFunctions: Array<() => void> = []

function addCleanup(fn: () => void) {
	cleanupFunctions.push(fn)
}

export function cleanupEasterEggs() {
	cleanupFunctions.forEach((fn) => fn())
	cleanupFunctions = []
}

let konamiIndex = 0
let konamiActivated = false
let konamiActivationTimer: ReturnType<typeof setTimeout> | null = null

export function initKonamiCode() {
	// Reset state
	konamiIndex = 0
	konamiActivated = false
	if (konamiActivationTimer) {
		clearTimeout(konamiActivationTimer)
		konamiActivationTimer = null
	}

	function resetKonami() {
		konamiIndex = 0
	}

	function activateKonami() {
		if (konamiActivated) return
		konamiActivated = true

		// Show a toast
		toast("🚀 Secret mode activated!", {
			description: "Enjoy the show.",
			duration: 4000,
		})

		// Subtle forest green hue shift
		const body = document.body
		const baseHue = 135
		const hueShift = 15
		gsap.to(body, {
			duration: 2,
			onUpdate: function () {
				const hue = baseHue + this.progress() * hueShift
				body.style.background = `linear-gradient(135deg, hsl(${hue}, 35%, 10%), hsl(${hue + 5}, 35%, 5%))`
			},
			onComplete: () => {
				// Reset after animation
				setTimeout(() => {
					body.style.background = ""
					body.classList.add("stars-bg")
				}, 5000)
			},
		})

		// Make all icons spin briefly
		const icons = document.querySelectorAll(".material-symbols-outlined")
		gsap.to(icons, {
			rotation: 360,
			duration: 2,
			ease: "power4.out",
			stagger: 0.05,
			onComplete: () => {
				gsap.to(icons, { rotation: 0, duration: 0.5 })
			},
		})

		konamiActivationTimer = setTimeout(() => {
			konamiActivated = false
			konamiActivationTimer = null
		}, 10000)
	}

	const handler = (e: KeyboardEvent) => {
		if (e.code === KONAMI_CODE[konamiIndex]) {
			konamiIndex++
			if (konamiIndex === KONAMI_CODE.length) {
				activateKonami()
				resetKonami()
			}
		} else {
			resetKonami()
		}
	}

	document.addEventListener("keydown", handler)

	addCleanup(() => {
		document.removeEventListener("keydown", handler)
		if (konamiActivationTimer) {
			clearTimeout(konamiActivationTimer)
			konamiActivationTimer = null
		}
	})
}

// Header mark click counter
let clickCount = 0
let clickTimer: ReturnType<typeof setTimeout> | null = null
let cupSecretActivated = false
let cupSecretResetTimer: ReturnType<typeof setTimeout> | null = null

export function initCoffeeCupEasterEgg() {
	// Reset state
	clickCount = 0
	if (clickTimer) {
		clearTimeout(clickTimer)
		clickTimer = null
	}
	cupSecretActivated = false
	if (cupSecretResetTimer) {
		clearTimeout(cupSecretResetTimer)
		cupSecretResetTimer = null
	}

	const markElements: Array<{ mark: Element; handler: () => void }> = []

	document.querySelectorAll("[data-logo-mark]").forEach((mark) => {
		const handler = () => {
			clickCount++

			if (clickTimer) clearTimeout(clickTimer)
			clickTimer = setTimeout(() => {
				clickCount = 0
			}, 2000)

			if (clickCount >= 5 && !cupSecretActivated) {
				cupSecretActivated = true
				clickCount = 0

				toast("Observatory aligned", {
					description: "The mark hums quietly. Good systems do that.",
					duration: 3000,
				})

				gsap.to(mark, {
					scale: 1.1,
					rotation: 8,
					duration: 0.3,
					ease: "power2.out",
					yoyo: true,
					repeat: 1,
					clearProps: "transform",
				})

				cupSecretResetTimer = setTimeout(() => {
					cupSecretActivated = false
					cupSecretResetTimer = null
				}, 5000)
			}
		}
		mark.addEventListener("click", handler)
		markElements.push({ mark, handler })
	})

	addCleanup(() => {
		markElements.forEach(({ mark, handler }) => {
			mark.removeEventListener("click", handler)
		})
		if (clickTimer) {
			clearTimeout(clickTimer)
			clickTimer = null
		}
		if (cupSecretResetTimer) {
			clearTimeout(cupSecretResetTimer)
			cupSecretResetTimer = null
		}
	})
}

// Hidden terminal command
let terminalClickCount = 0
let terminalTimer: ReturnType<typeof setTimeout> | null = null
let terminalSecretActivated = false
let terminalCheckInterval: ReturnType<typeof setInterval> | null = null
let terminalStopTimeout: ReturnType<typeof setTimeout> | null = null

export function initTerminalSecret() {
	// Cleanup previous instance
	if (terminalCheckInterval) {
		clearInterval(terminalCheckInterval)
		terminalCheckInterval = null
	}
	if (terminalStopTimeout) {
		clearTimeout(terminalStopTimeout)
		terminalStopTimeout = null
	}
	terminalClickCount = 0
	if (terminalTimer) {
		clearTimeout(terminalTimer)
		terminalTimer = null
	}
	terminalSecretActivated = false

	// Re-check periodically for the cursor element (it may render after GSAP animation)
	terminalCheckInterval = setInterval(() => {
		const cursor = document.querySelector("#about .animate-blink")
		if (cursor && !terminalSecretActivated) {
			if (terminalCheckInterval) clearInterval(terminalCheckInterval)
			terminalCheckInterval = null

			const clickHandler = () => {
				terminalClickCount++

				if (terminalTimer) clearTimeout(terminalTimer)
				terminalTimer = setTimeout(() => {
					terminalClickCount = 0
				}, 3000)

				if (terminalClickCount >= 3 && !terminalSecretActivated) {
					terminalSecretActivated = true
					terminalClickCount = 0

					// Add a secret message after the cursor line
					const terminalContent = document.querySelector("#about .terminal-window .p-6.font-mono")
					if (terminalContent) {
						const secretLine = document.createElement("div")
						secretLine.className = "mt-4"
						secretLine.innerHTML =
							'<span class="text-yellow-400">➜</span> <span class="text-blue-400">~</span> <span class="text-yellow-400">sudo</span> <span class="text-green-400">reveal_secrets</span>'
						const secretMessage = document.createElement("div")
						secretMessage.className = "mt-2 text-yellow-400/80 italic text-xs"
						secretMessage.textContent =
							">> ACCESS GRANTED: You found the hidden terminal. The pilot is always watching."

						terminalContent.appendChild(secretLine)
						terminalContent.appendChild(secretMessage)

						// Subtle fade-in reveal
						gsap.fromTo(
							[secretLine, secretMessage],
							{ opacity: 0, y: 4 },
							{ opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power2.out" }
						)

						toast("🔓 Terminal secret unlocked!", { duration: 3000 })
					}
				}
			}

			cursor.addEventListener("click", clickHandler)

			// Track cleanup for cursor listener
			addCleanup(() => {
				cursor.removeEventListener("click", clickHandler)
			})
		}
	}, 2000)

	// Stop checking after 15 seconds if not found
	terminalStopTimeout = setTimeout(() => {
		if (terminalCheckInterval) {
			clearInterval(terminalCheckInterval)
			terminalCheckInterval = null
		}
	}, 15000)

	addCleanup(() => {
		if (terminalCheckInterval) {
			clearInterval(terminalCheckInterval)
			terminalCheckInterval = null
		}
		if (terminalStopTimeout) {
			clearTimeout(terminalStopTimeout)
			terminalStopTimeout = null
		}
		if (terminalTimer) {
			clearTimeout(terminalTimer)
			terminalTimer = null
		}
	})
}
