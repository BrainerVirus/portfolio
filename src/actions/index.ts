import { Resend } from "resend"
import { defineAction } from "astro:actions"

export type ContactPayload = {
	name: string
	email: string
	message: string
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
		throw new Error("Email service is not configured")
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
		throw new Error(error.message)
	}

	return data
}

// Astro Actions entrypoint expected by the build (virtual:astro:actions/entrypoint)
export const server = {
	contact: defineAction({
		accept: "form",
		handler: async (input) => {
			await sendContactEmail(input)
			return { ok: true }
		},
	}),
}
