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

let konamiIndex = 0
let konamiActivated = false

export function initKonamiCode() {
	if (konamiActivated) return

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

		// Rainbow background animation
		const body = document.body
		gsap.to(body, {
			duration: 2,
			onUpdate: function () {
				const hue = (this.progress() * 360) % 360
				body.style.background = `linear-gradient(135deg, hsl(${hue}, 60%, 10%), hsl(${(hue + 180) % 360}, 60%, 5%))`
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

		setTimeout(() => {
			konamiActivated = false
		}, 10000)
	}

	document.addEventListener("keydown", (e) => {
		if (e.code === KONAMI_CODE[konamiIndex]) {
			konamiIndex++
			if (konamiIndex === KONAMI_CODE.length) {
				activateKonami()
				resetKonami()
			}
		} else {
			resetKonami()
		}
	})
}

// Coffee cup click counter
let clickCount = 0
let clickTimer: ReturnType<typeof setTimeout> | null = null
let cupSecretActivated = false

export function initCoffeeCupEasterEgg() {
	if (cupSecretActivated) return

	document.querySelectorAll(".material-symbols-outlined").forEach((icon) => {
		if (icon.textContent?.trim() === "local_cafe") {
			icon.addEventListener("click", () => {
				clickCount++

				if (clickTimer) clearTimeout(clickTimer)
				clickTimer = setTimeout(() => {
					clickCount = 0
				}, 2000)

				if (clickCount >= 5 && !cupSecretActivated) {
					cupSecretActivated = true
					clickCount = 0

					toast("☕ Caffeine overload!", {
						description: "The coffee cup demands attention.",
						duration: 3000,
					})

					// Shake all coffee cups
					const cups = document.querySelectorAll(".material-symbols-outlined")
					const coffeeCups = Array.from(cups).filter(
						(c) => (c as HTMLElement).textContent?.trim() === "local_cafe"
					)

					gsap.fromTo(
						coffeeCups,
						{ scale: 1 },
						{
							scale: 2,
							duration: 0.5,
							ease: "elastic.out(1, 0.3)",
							onComplete: () => {
								gsap.to(coffeeCups, { scale: 1, duration: 0.3 })
							},
						}
					)

					setTimeout(() => {
						cupSecretActivated = false
					}, 5000)
				}
			})
		}
	})
}

// Hidden terminal command
let terminalClickCount = 0
let terminalTimer: ReturnType<typeof setTimeout> | null = null
let terminalSecretActivated = false

export function initTerminalSecret() {
	if (terminalSecretActivated) return

	// Re-check periodically for the cursor element (it may render after GSAP animation)
	const checkForCursor = setInterval(() => {
		const cursor = document.querySelector("#about .animate-blink")
		if (cursor && !terminalSecretActivated) {
			clearInterval(checkForCursor)

			cursor.addEventListener("click", () => {
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

						// Animate the reveal
						gsap.fromTo(
							[secretLine, secretMessage],
							{ opacity: 0, y: 10 },
							{ opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power2.out" }
						)

						toast("🔓 Terminal secret unlocked!", { duration: 3000 })
					}
				}
			})
		}
	}, 2000)

	// Stop checking after 15 seconds if not found
	setTimeout(() => clearInterval(checkForCursor), 15000)
}
