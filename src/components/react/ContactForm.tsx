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

		if (!name.trim()) {
			newErrors.name = translations.error.nameRequired
		}

		if (!email.trim()) {
			newErrors.email = translations.error.emailRequired
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = translations.error.emailInvalid
		}

		if (!message.trim()) {
			newErrors.message = translations.error.messageRequired
		} else if (message.length < 10) {
			newErrors.message = translations.error.messageMinLength
		}

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
			<div className="space-y-2">
				<label
					htmlFor="name"
					className="font-mono text-xs tracking-widest text-[#a89a84] uppercase"
				>
					{translations.name}
				</label>
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
					placeholder={translations.namePlaceholder}
					className={`w-full border-0 border-b border-[#f0e6d2]/12 bg-transparent py-3 text-[#f0e6d2] placeholder:text-[#6b6055] focus:border-[#3a7a4d] focus:outline-none focus:ring-0 transition-colors ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
				/>
				{errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
			</div>

			<div className="space-y-2">
				<label
					htmlFor="email"
					className="font-mono text-xs tracking-widest text-[#a89a84] uppercase"
				>
					{translations.email}
				</label>
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
					placeholder={translations.emailPlaceholder}
					className={`w-full border-0 border-b border-[#f0e6d2]/12 bg-transparent py-3 text-[#f0e6d2] placeholder:text-[#6b6055] focus:border-[#3a7a4d] focus:outline-none focus:ring-0 transition-colors ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
				/>
				{errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
			</div>

			<div className="space-y-2">
				<label
					htmlFor="message"
					className="font-mono text-xs tracking-widest text-[#a89a84] uppercase"
				>
					{translations.message}
				</label>
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
					placeholder={translations.messagePlaceholder}
					rows={4}
					className={`w-full resize-none border-0 border-b border-[#f0e6d2]/12 bg-transparent py-3 text-[#f0e6d2] placeholder:text-[#6b6055] focus:border-[#3a7a4d] focus:outline-none focus:ring-0 transition-colors ${errors.message ? "border-red-500 focus:border-red-500" : ""}`}
				/>
				{errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-[#3a7a4d] py-4 text-sm font-bold tracking-widest uppercase text-white transition-all hover:scale-[1.02] hover:bg-[#4a8a5d] disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isSubmitting ? translations.sending : translations.submit}
			</button>
		</form>
	)
}
