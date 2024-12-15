import { welcomeEmail } from "@consts/email-templates"
import { ActionError, defineAction } from "astro:actions"
import { z } from "astro:schema"
import { Resend } from "resend"

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
	send: defineAction({
		accept: "form",
		input: z.object({
			email: z.string().email(),
			subject: z.string(),
			message: z.string(),
		}),
		handler: async (input) => {
			console.log("🚀 ~ handler: ~ input:", input)
			const { data, error } = await resend.emails.send({
				from: import.meta.env.RESEND_EMAIL,
				to: [import.meta.env.EMAIL_TO],
				subject: input.subject,
				html: welcomeEmail(input.email),
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

// export const server = {
// 	send: defineAction({
// 		accept: "form",
// 		handler: async () => {
// 			const { data, error } = await resend.emails.send({
// 				from: "noreply@cristhoferpincetti.dev",
// 				to: ["github.annotate387@passmail.net"],
// 				subject: "Hello world",
// 				html: "<strong>It works!</strong>",
// 			})

// 			if (error) {
// 				throw new ActionError({
// 					code: "BAD_REQUEST",
// 					message: error.message,
// 				})
// 			}

// 			return data
// 		},
// 	}),
// }
