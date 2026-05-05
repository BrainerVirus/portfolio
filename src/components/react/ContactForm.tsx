"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { actions } from "astro:actions"
import gsap from "gsap"
import {
	getContactFormTranslations,
	languageChangeEvent,
	type LiveLanguageDetail,
} from "@/lib/live-language"

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

interface AnimatedFieldProps {
	id: string
	label: string
	value: string
	placeholder: string
	error?: string
	children: (inputClassName: string) => ReactNode
	multiline?: boolean
}

function AnimatedField({
	id,
	label,
	value,
	placeholder,
	error,
	children,
	multiline = false,
}: AnimatedFieldProps) {
	const lastCharRef = useRef<HTMLSpanElement>(null)
	const caretRef = useRef<HTMLSpanElement>(null)
	const previousValue = useRef(value)
	const [isFocused, setIsFocused] = useState(false)
	const displayValue = value || placeholder
	const isPlaceholder = !value

	useEffect(() => {
		const lastChar = lastCharRef.current
		const caret = caretRef.current
		if (!lastChar || !caret || previousValue.current === value) return

		const isAdding = value.length > previousValue.current.length
		previousValue.current = value

		if (!isAdding) return

		gsap.fromTo(
			lastChar,
			{ autoAlpha: 0, x: -6 },
			{ autoAlpha: 1, x: 0, duration: 0.18, ease: "power2.out" }
		)
		gsap.fromTo(
			caret,
			{ scaleY: 0.35, boxShadow: "0 0 0 rgba(58,122,77,0)" },
			{
				scaleY: 1,
				boxShadow: "0 0 18px rgba(58,122,77,0.55)",
				duration: 0.22,
				ease: "power2.out",
			}
		)
	}, [value])

	const showCaret = isFocused

	function handleFocus(e: React.FocusEvent) {
		if (e.target === e.currentTarget) return
		setIsFocused(true)
	}

	function handleBlur(e: React.FocusEvent) {
		if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return
		setIsFocused(false)
	}

	const inputClassName = `relative z-10 w-full border-0 border-b border-[#f0e6d2]/12 bg-transparent py-3 text-transparent caret-transparent placeholder:text-transparent focus:border-[#3a7a4d] focus:outline-none focus:ring-0 transition-colors ${error ? "border-red-500 focus:border-red-500" : ""}`
	const textClass = multiline
		? "whitespace-pre-wrap break-words leading-normal"
		: "truncate whitespace-pre leading-normal"

	return (
		<div className="space-y-2" data-animated-field>
			<label htmlFor={id} className="font-mono text-xs tracking-widest text-[#a89a84] uppercase">
				{label}
			</label>
			<div className="relative" onFocus={handleFocus} onBlur={handleBlur}>
				<div
					className={`pointer-events-none absolute inset-x-0 top-0 z-0 py-3 text-[#f0e6d2] ${textClass} ${isPlaceholder ? "text-[#f0e6d2]/25" : ""}`}
					data-animated-field-mirror
					aria-hidden="true"
				>
					{showCaret && !value && (
						<span
							ref={caretRef}
							className="absolute left-0 top-1/2 -translate-y-1/2 h-[1.15em] w-px bg-[#3a7a4d]"
							data-animated-field-caret
						/>
					)}
					<span>{displayValue.slice(0, -1)}</span>
					<span ref={lastCharRef}>{displayValue.slice(-1)}</span>
					{showCaret && !!value && (
						<span
							ref={caretRef}
							className="ml-0.5 inline-block h-[1.15em] w-px origin-center translate-y-0.5 bg-[#3a7a4d]"
							data-animated-field-caret
						/>
					)}
				</div>
				{children(inputClassName)}
			</div>
			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	)
}

export default function ContactForm({ locale, translations }: ContactFormProps) {
	type SubmitStatus = "idle" | "sending" | "success" | "error"

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [message, setMessage] = useState("")
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
	const [currentLocale, setCurrentLocale] = useState(locale)
	const [copy, setCopy] = useState(translations)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const labelRef = useRef<HTMLSpanElement>(null)
	const planeRef = useRef<SVGSVGElement>(null)
	const orbitRef = useRef<SVGCircleElement>(null)

	useEffect(() => {
		const onLanguageChange = (event: Event) => {
			const detail = (event as CustomEvent<LiveLanguageDetail>).detail
			setCurrentLocale(detail.language)
			setCopy(getContactFormTranslations(detail.language))
		}

		document.addEventListener(languageChangeEvent, onLanguageChange)

		return () => {
			document.removeEventListener(languageChangeEvent, onLanguageChange)
		}
	}, [])

	useEffect(() => {
		const ctx = gsap.context(() => {
			const button = buttonRef.current
			const label = labelRef.current
			const plane = planeRef.current
			const orbit = orbitRef.current
			if (!button || !label || !plane || !orbit) return

			gsap.killTweensOf([button, label, plane, orbit])

			if (submitStatus === "idle") {
				gsap.to(button, {
					scale: 1,
					backgroundColor: "#3a7a4d",
					borderColor: "rgba(240,230,210,0.08)",
					duration: 0.3,
					ease: "power2.out",
				})
				gsap.to(plane, { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: 0.35 })
				gsap.to(orbit, { strokeDashoffset: 82, autoAlpha: 0.35, duration: 0.3 })
				return
			}

			if (submitStatus === "sending") {
				const tl = gsap.timeline({ repeat: -1 })
				tl.to(button, {
					scale: 0.985,
					backgroundColor: "#2f6841",
					duration: 0.28,
					ease: "power2.out",
				})
				tl.to(orbit, { strokeDashoffset: 0, duration: 0.85, ease: "power1.inOut" }, 0)
				tl.to(plane, { x: 10, y: -8, rotate: 18, duration: 0.42, ease: "power2.inOut" }, 0)
				tl.to(plane, { x: 0, y: 0, rotate: 0, duration: 0.42, ease: "power2.inOut" }, 0.42)
				return
			}

			const success = submitStatus === "success"
			const tl = gsap.timeline()
			tl.to(plane, {
				x: success ? 96 : 0,
				y: success ? -34 : 0,
				rotate: success ? 28 : -12,
				autoAlpha: success ? 0 : 1,
				duration: 0.42,
				ease: "power3.in",
			})
			tl.to(
				button,
				{
					scale: success ? 1.025 : 0.99,
					backgroundColor: success ? "#4a9a6d" : "#8a3a3a",
					borderColor: success ? "rgba(240,230,210,0.2)" : "rgba(255,160,160,0.28)",
					duration: 0.32,
					ease: success ? "back.out(2)" : "power2.out",
				},
				0
			)
			tl.fromTo(
				label,
				{ y: 8, autoAlpha: 0 },
				{ y: 0, autoAlpha: 1, duration: 0.24, ease: "power2.out" },
				0.18
			)
		}, buttonRef)

		return () => ctx.revert()
	}, [submitStatus])

	useEffect(() => {
		if (submitStatus !== "success" && submitStatus !== "error") return

		const timer = window.setTimeout(() => {
			setSubmitStatus("idle")
		}, 1800)

		return () => window.clearTimeout(timer)
	}, [submitStatus])

	const buttonLabel =
		submitStatus === "sending"
			? copy.sending
			: submitStatus === "success"
				? copy.success
				: submitStatus === "error"
					? copy.failed
					: copy.submit

	function validate(): boolean {
		const newErrors: Record<string, string> = {}

		if (!name.trim()) {
			newErrors.name = copy.error.nameRequired
		}

		if (!email.trim()) {
			newErrors.email = copy.error.emailRequired
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = copy.error.emailInvalid
		}

		if (!message.trim()) {
			newErrors.message = copy.error.messageRequired
		} else if (message.length < 10) {
			newErrors.message = copy.error.messageMinLength
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	async function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault()

		if (!validate()) return

		setIsSubmitting(true)
		setSubmitStatus("sending")

		try {
			const result = await actions.contact({ name, email, message, locale: currentLocale })
			if (!result.error) {
				setName("")
				setEmail("")
				setMessage("")
				setErrors({})
				setSubmitStatus("success")
			} else {
				setSubmitStatus("error")
			}
		} catch {
			setSubmitStatus("error")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form id="contact-form" onSubmit={handleSubmit} className="space-y-8" noValidate>
			<AnimatedField
				id="name"
				label={copy.name}
				value={name}
				placeholder={copy.namePlaceholder}
				error={errors.name}
			>
				{(inputClassName) => (
					<input
						id="name"
						name="name"
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value)
							setErrors((prev) => {
								const next = { ...prev }
								delete next.name
								return next
							})
						}}
						placeholder={copy.namePlaceholder}
						className={inputClassName}
					/>
				)}
			</AnimatedField>

			<AnimatedField
				id="email"
				label={copy.email}
				value={email}
				placeholder={copy.emailPlaceholder}
				error={errors.email}
			>
				{(inputClassName) => (
					<input
						id="email"
						name="email"
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value)
							setErrors((prev) => {
								const next = { ...prev }
								delete next.email
								return next
							})
						}}
						placeholder={copy.emailPlaceholder}
						className={inputClassName}
					/>
				)}
			</AnimatedField>

			<AnimatedField
				id="message"
				label={copy.message}
				value={message}
				placeholder={copy.messagePlaceholder}
				error={errors.message}
				multiline
			>
				{(inputClassName) => (
					<textarea
						id="message"
						name="message"
						value={message}
						onChange={(e) => {
							setMessage(e.target.value)
							setErrors((prev) => {
								const next = { ...prev }
								delete next.message
								return next
							})
						}}
						placeholder={copy.messagePlaceholder}
						rows={4}
						className={`${inputClassName} resize-none`}
					/>
				)}
			</AnimatedField>

			<button
				ref={buttonRef}
				type="submit"
				disabled={isSubmitting}
				data-status={submitStatus}
				aria-live="polite"
				className="group relative flex min-h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-[#f0e6d2]/8 bg-[#3a7a4d] px-6 py-4 text-sm font-bold tracking-widest uppercase text-white shadow-[0_18px_55px_rgba(58,122,77,0.18)] transition-transform hover:scale-[1.015] disabled:cursor-not-allowed disabled:opacity-80"
			>
				<span className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/12 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
				<span ref={labelRef} className="relative z-10 pr-9">
					{buttonLabel}
				</span>
				<svg
					ref={planeRef}
					className="absolute right-5 z-10 h-6 w-6 overflow-visible"
					viewBox="0 0 32 32"
					fill="none"
					aria-hidden="true"
				>
					<circle
						ref={orbitRef}
						cx="16"
						cy="16"
						r="13"
						stroke="rgba(240,230,210,0.45)"
						strokeWidth="1"
						strokeDasharray="82"
						strokeDashoffset="82"
					/>
					<path d="M5 16.5L27 6L20.5 27L16.2 18.4L5 16.5Z" fill="rgba(240,230,210,0.95)" />
					<path
						d="M16.2 18.4L27 6L12.7 17.8"
						stroke="#3a7a4d"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</form>
	)
}
