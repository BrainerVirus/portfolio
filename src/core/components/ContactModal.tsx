import { Button } from "@/core/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/core/components/ui/dialog"
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"

interface ContactModalProps {
	translations: {
		trigger: string
		title: string
		description: string
		name: string
		namePlaceholder: string
		email: string
		emailPlaceholder: string
		subject: string
		subjectPlaceholder: string
		message: string
		messagePlaceholder: string
		cancel: string
		submit: string
	}
}

export function ContactModal({ translations }: ContactModalProps) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log("Form submitted")
		// TODO: Implement form submission with Resend
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{translations.trigger}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>{translations.title}</DialogTitle>
						<DialogDescription>{translations.description}</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">{translations.name}</Label>
							<Input id="name" name="name" placeholder={translations.namePlaceholder} required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">{translations.email}</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder={translations.emailPlaceholder}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="subject">{translations.subject}</Label>
							<Input
								id="subject"
								name="subject"
								placeholder={translations.subjectPlaceholder}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="message">{translations.message}</Label>
							<textarea
								id="message"
								name="message"
								placeholder={translations.messagePlaceholder}
								className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" type="button">
								{translations.cancel}
							</Button>
						</DialogClose>
						<Button type="submit">{translations.submit}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

// Backward compatibility export
export { ContactModal as DialogDemo }
