import type { APIRoute } from "astro"
import { Resend } from "resend"

const {
	RESEND_API_KEY: resendApiKey,
	RESEND_EMAIL: resendEmail,
	EMAIL_TO: emailTo,
} = import.meta.env

const resend = new Resend(resendApiKey)

export const POST: APIRoute = async ({ request }) => {
	try {
		if (!resendApiKey || !resendEmail || !emailTo) {
			return new Response(JSON.stringify({ error: "Email service is not configured" }), {
				status: 500,
				headers: { "content-type": "application/json" },
			})
		}

		const contentType = request.headers.get("content-type") || ""
		let name = ""
		let email = ""
		let message = ""
		let subject = ""

		if (contentType.includes("application/json")) {
			const body = await request.json()
			name = String(body.name || "")
			email = String(body.email || "")
			message = String(body.message || "")
			subject = String(body.subject || "")
		} else if (contentType.includes("application/x-www-form-urlencoded")) {
			const form = await request.formData()
			name = String(form.get("name") || "")
			email = String(form.get("email") || "")
			message = String(form.get("message") || "")
			subject = String(form.get("subject") || "")
		} else {
			return new Response(JSON.stringify({ error: "Unsupported content-type" }), {
				status: 415,
				headers: { "content-type": "application/json" },
			})
		}

		if (!name || !email || !message) {
			return new Response(JSON.stringify({ error: "Missing required fields" }), {
				status: 400,
				headers: { "content-type": "application/json" },
			})
		}

		const { data, error } = await resend.emails.send({
			from: `Portfolio <${resendEmail}>`,
			to: [emailTo],
			subject: subject ? `${subject} — ${name}` : `Contact Form Submission from ${name}`,
			html: `<p><strong>From:</strong> ${name} (${email})</p>${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}<p>${message}</p>`,
			replyTo: email,
		})

		if (error) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { "content-type": "application/json" },
			})
		}

		return new Response(JSON.stringify({ ok: true, id: data?.id }), {
			status: 200,
			headers: { "content-type": "application/json" },
		})
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { "content-type": "application/json" },
		})
	}
}
