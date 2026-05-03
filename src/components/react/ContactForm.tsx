"use client"

import { useState } from "react"
import { actions } from "astro:actions"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ContactFormProps {
	locale: "en" | "es"
	translations: {
		senderId: string
		senderIdPlaceholder: string
		frequency: string
		frequencyPlaceholder: string
		transmission: string
		transmissionPlaceholder: string
		submit: string
		sending: string
		sent: string
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
		<Card className="glass-card border-white/10 hover:border-primary/40 transition-colors duration-500">
			<CardHeader className="pb-2">
				<CardTitle className="text-primary font-mono text-sm tracking-widest uppercase">
					{locale === "en" ? "Establish Connection" : "Establecer Conexión"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form id="contact-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
					<div className="space-y-1.5">
						<Label
							htmlFor="name"
							className="text-primary font-mono text-xs tracking-widest uppercase"
						>
							{translations.senderId}
						</Label>
						<Input
							id="name"
							name="name"
							value={name}
							onChange={(e) => {
								setName(e.target.value)
								setErrors((prev) => {
									const next = { ...prev }
									delete next.name
									return next
								})
							}}
							placeholder={translations.senderIdPlaceholder}
							className={cn(
								"font-body bg-background-dark/50 border-white/10 text-white placeholder:text-gray-600 h-12",
								errors.name && "border-red-500 focus:border-red-500"
							)}
						/>
						{errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
					</div>

					<div className="space-y-1.5">
						<Label
							htmlFor="email"
							className="text-primary font-mono text-xs tracking-widest uppercase"
						>
							{translations.frequency}
						</Label>
						<Input
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
							placeholder={translations.frequencyPlaceholder}
							className={cn(
								"font-body bg-background-dark/50 border-white/10 text-white placeholder:text-gray-600 h-12",
								errors.email && "border-red-500 focus:border-red-500"
							)}
						/>
						{errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
					</div>

					<div className="space-y-1.5">
						<Label
							htmlFor="message"
							className="text-primary font-mono text-xs tracking-widest uppercase"
						>
							{translations.transmission}
						</Label>
						<Textarea
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
							placeholder={translations.transmissionPlaceholder}
							rows={4}
							className={cn(
								"font-body bg-background-dark/50 border-white/10 text-white placeholder:text-gray-600 resize-none",
								errors.message && "border-red-500 focus:border-red-500"
							)}
						/>
						{errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
					</div>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="group bg-primary hover:bg-primary/90 relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg px-8 py-6 text-sm font-bold tracking-widest uppercase shadow-lg hover:shadow-[0_0_25px_rgba(131,59,145,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
					>
						<span className="relative z-10">
							{isSubmitting ? translations.sending : translations.submit}
						</span>
						<span
							className={cn(
								"material-symbols-outlined relative z-10 text-lg transition-transform",
								!isSubmitting && "group-hover:translate-x-1"
							)}
						>
							{isSubmitting ? "hourglass_empty" : "send"}
						</span>
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
