import { ActionError, defineAction } from "astro:actions"
import { z } from "astro:schema"
import { Resend } from "resend"

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
	sendEmail: defineAction({
		accept: "form",
		input: z.object({
			name: z.string(),
			email: z.string().email(),
			message: z.string(),
		}),
		handler: async ({ email, message, name }) => {
			const { data, error } = await resend.emails.send({
				from: `Portfolio < ${import.meta.env.RESEND_EMAIL} >`,
				to: [import.meta.env.EMAIL_TO],
				subject: "Contact Form Submission",
				html: `<p>From: ${name} (${email})</p><p>Message: ${message}</p>`,
			})

			if (error) {
				throw new ActionError({
					code: "BAD_REQUEST",
					message: error.message,
				})
			}

			return data
		},
	}),
}
