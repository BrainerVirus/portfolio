import { z } from "astro/zod"
import { ActionError, defineAction } from "astro:actions"
import { Resend } from "resend"

export type ContactPayload = {
	name: string
	email: string
	message: string
	locale?: "en" | "es"
	subject?: string
}

const {
	RESEND_API_KEY: resendApiKey,
	RESEND_EMAIL: resendEmail,
	EMAIL_TO: emailTo,
} = import.meta.env

const resend = new Resend(resendApiKey)

function ensureEmailConfig() {
	if (!resendApiKey || !resendEmail || !emailTo) {
		throw new ActionError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Email service is not configured",
		})
	}
}

export async function sendContactEmail({ name, email, message, subject }: ContactPayload) {
	ensureEmailConfig()

	const { data, error } = await resend.emails.send({
		from: `Portfolio <${resendEmail}>`,
		to: [emailTo],
		subject: subject ? `${subject} — ${name}` : "Contact Form Submission",
		html: `<p><strong>From:</strong> ${name} (${email})</p>${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}<p>${message}</p>`,
		replyTo: email,
	})

	if (error) {
		throw new ActionError({
			code: "BAD_REQUEST",
			message: error.message,
		})
	}

	return data
}

// Astro Actions entrypoint expected by the build
export const server = {
	contact: defineAction({
		input: z.object({
			name: z.string().min(1, "Name is required"),
			email: z.string().email("Valid email is required"),
			message: z.string().min(1, "Message is required"),
			locale: z.enum(["en", "es"]).optional(),
			subject: z.string().optional(),
		}),
		handler: async (input) => {
			await sendContactEmail(input)
			return { ok: true }
		},
	}),
}
