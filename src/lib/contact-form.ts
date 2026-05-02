import { actions } from "astro:actions";
import { getTranslation } from "@/i18n/utils";

interface ValidationResult {
	isValid: boolean;
	errors: {
		name?: string;
		email?: string;
		message?: string;
	};
}

function validateForm(
	name: string,
	email: string,
	message: string,
	locale: "en" | "es",
): ValidationResult {
	const errors: ValidationResult["errors"] = {};

	// Validate name
	if (!name || name.trim() === "") {
		errors.name = getTranslation(locale, "contact.error.nameRequired");
	} else if (name.length < 2) {
		errors.name = getTranslation(locale, "contact.error.nameMinLength");
	} else if (name.length > 100) {
		errors.name = getTranslation(locale, "contact.error.nameMaxLength");
	}

	// Validate email
	if (!email || email.trim() === "") {
		errors.email = getTranslation(locale, "contact.error.emailRequired");
	} else {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			errors.email = getTranslation(locale, "contact.error.emailInvalid");
		}
	}

	// Validate message
	if (!message || message.trim() === "") {
		errors.message = getTranslation(locale, "contact.error.messageRequired");
	} else if (message.length < 10) {
		errors.message = getTranslation(locale, "contact.error.messageMinLength");
	} else if (message.length > 5000) {
		errors.message = getTranslation(locale, "contact.error.messageMaxLength");
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
}

function clearFieldErrors() {
	const errorElements = document.querySelectorAll("[id$='-error']");
	errorElements.forEach((el) => {
		el.textContent = "";
		el.classList.add("hidden");
	});
}

function displayFieldErrors(errors: ValidationResult["errors"]) {
	clearFieldErrors();

	if (errors.name) {
		const nameError = document.getElementById("name-error");
		if (nameError) {
			nameError.textContent = errors.name;
			nameError.classList.remove("hidden");
		}
	}

	if (errors.email) {
		const emailError = document.getElementById("email-error");
		if (emailError) {
			emailError.textContent = errors.email;
			emailError.classList.remove("hidden");
		}
	}

	if (errors.message) {
		const messageError = document.getElementById("message-error");
		if (messageError) {
			messageError.textContent = errors.message;
			messageError.classList.remove("hidden");
		}
	}
}

export function initializeContactForm(locale: "en" | "es") {
	const form = document.getElementById("contact-form") as HTMLFormElement | null;
	const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement | null;
	const btnText = document.getElementById("btn-text") as HTMLSpanElement | null;
	const btnIcon = document.getElementById("btn-icon") as HTMLSpanElement | null;
	const formMessage = document.getElementById("form-message") as HTMLDivElement | null;

	if (!form || !submitBtn || !btnText || !btnIcon || !formMessage) {
		console.error("Contact form elements not found");
		return;
	}

	// Disable browser's default validation
	form.noValidate = true;

	// Get all input elements and prevent default validation popups
	const inputs = form.querySelectorAll("input, textarea");
	inputs.forEach((input) => {
		input.addEventListener("invalid", (e) => {
			e.preventDefault();
		});
	});

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const name = String(formData.get("name") || "").trim();
		const email = String(formData.get("email") || "").trim();
		const message = String(formData.get("message") || "").trim();

		const validation = validateForm(name, email, message, locale);

		// Show field-level validation errors if any
		if (!validation.isValid) {
			displayFieldErrors(validation.errors);
			return;
		}

		// Clear any previous errors and messages
		clearFieldErrors();
		formMessage.classList.add("hidden");

		// Disable button and show loading
		submitBtn.disabled = true;
		btnText.textContent = getTranslation(locale, "contact.messages.transmitting");
		btnIcon.textContent = "hourglass_empty";

		const data = {
			name,
			email,
			message,
			locale,
		};

		try {
			const result = await actions.contact(data);
			console.log("Action result:", result);

			if (!result.error) {
				// Success
				formMessage.textContent = getTranslation(locale, "contact.messages.success");
				formMessage.className = "text-center text-sm text-green-400";
				formMessage.classList.remove("hidden");
				form.reset();
				btnText.textContent = getTranslation(locale, "contact.messages.transmitted");
				btnIcon.textContent = "check_circle";

				// Reset button after 3 seconds
				setTimeout(() => {
					btnText.textContent = getTranslation(locale, "contact.messages.sendDataBurst");
					btnIcon.textContent = "send";
					submitBtn.disabled = false;
					formMessage.classList.add("hidden");
				}, 3000);
			} else {
				// Error
				const errorMessage =
					result.error?.code === "BAD_REQUEST"
						? result.error?.message || getTranslation(locale, "contact.messages.failed")
						: getTranslation(locale, "contact.messages.failed");
				formMessage.textContent = errorMessage;
				formMessage.className = "text-center text-sm text-red-400";
				formMessage.classList.remove("hidden");
				btnText.textContent = getTranslation(locale, "contact.messages.sendDataBurst");
				btnIcon.textContent = "send";
				submitBtn.disabled = false;
			}
		} catch (err) {
			console.error("Form submission error:", err);
			formMessage.textContent = getTranslation(locale, "contact.messages.connectionLost");
			formMessage.className = "text-center text-sm text-red-400";
			formMessage.classList.remove("hidden");
			btnText.textContent = getTranslation(locale, "contact.messages.sendDataBurst");
			btnIcon.textContent = "send";
			submitBtn.disabled = false;
		}
	});
}
