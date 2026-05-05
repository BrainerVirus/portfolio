export const nav = {
	home: "Home",
	about: "About",
	experience: "Work",
	skills: "Skills",
	contact: "Contact",
} as const

export const common = {
	readMore: "Read more",
	loading: "Loading...",
	error: "An error occurred",
	success: "Success!",
} as const

export const language = {
	switch: "Language options",
	system: "System",
	english: "English",
	spanish: "Español",
	currentSystem: "Using system language",
} as const

export const about = {
	title: "",
	subtitle: "",
	identity: "Identity",
	name: "Cristhofer Pincetti",
	class: "Class",
	role: "Software Engineer",
	location: "Location",
	locationValue: "Somewhere between terminal tabs, Chile",
	status: "Status",
	statusValue: "Building scalable systems and drinking dark roast.",
	quote:
		"Passionate about clean code, UI craft, and exploring the frontiers of web technology. When not coding, I'm likely refactoring my life or debugging reality.",
} as const

export const experience = {
	title: "Work",
	subtitle: "Places I've built things.",
	jobs: [
		{
			title: "Software Engineer",
			company: "Sixbell",
			description:
				"Leading Microfrontend (MFE) architecture and designing new modules for large-scale web products. Spearheaded the 'Sixbell Telco UI Kit' (NPM) and modernized the stack toward modular patterns. Driving cross-cutting improvements across product architecture for UX, quality, and scalability.",
			period: "Nov 2023 - Present",
			tags: ["Angular", "MFE", "UI Kit", "UI/UX", "Docker", "NPM"],
		},
		{
			title: "Lead Developer",
			company: "Magic Key",
			description:
				"Built a multi-platform Electron tool turning your phone into a remote macro-pad for PC (Stream Deck style). Implemented real-time communication with Socket.io. Handled everything from brand design to server deployment.",
			period: "Jan 2024 - Mar 2024",
			tags: ["Electron", "Socket.io", "Node.js", "React", "Real-time"],
		},
		{
			title: "Lead Developer",
			company: "Soltec Water — University of La Serena",
			description:
				"Designed a water management system for real-time resource monitoring. Built data models for field telemetry and route logistics, creating analytical dashboards to optimize processes and track pH, flow, and other parameters.",
			period: "Sep 2023 - Mar 2024",
			tags: ["Next.js", "Prisma", "AWS", "PostgreSQL", "Tailwind"],
		},
		{
			title: "Software Engineer",
			company: "Hospital San Juan de Dios — Adhara ERP",
			description:
				"Key developer for Pharmacy and Finance ERP modules. Integrated peripheral hardware and custom JavaScript logic for medical supply traceability. Optimized operational efficiency and prescription workflows in a live hospital environment.",
			period: "Oct 2022 - Sep 2023",
			tags: ["Genexus", "JavaScript", "ERP", "Logistics", "SQL"],
		},
	],
	arcana: [
		{
			name: "The Pager Star",
			constellation: "Sixbell Major",
			reward:
				"You uncovered the support-call comet. It only appears when production behaves for five whole minutes.",
		},
		{
			name: "The Macro Magician",
			constellation: "Key of Sparks",
			reward: "A tiny ritual unlocks: every boring shortcut now owes you dramatic entrance music.",
		},
		{
			name: "The Water Oracle",
			constellation: "Hydra Dashboard",
			reward: "The graphs whisper: hydrate first, optimize second. Annoyingly wise.",
		},
		{
			name: "The Inventory Moon",
			constellation: "Adhara Nocturne",
			reward:
				"Hidden bonus: one perfectly traced supply chain and a receipt that finally tells the truth.",
		},
	],
	flip: "Reveal arcana",
	close: "Close",
} as const

export const skills = {
	title: "Skills",
	subtitle: "What I work with.",
	core: "Core",
	systems: "Systems",
	craft: "Craft",
	mastery: "Mastery",
	core_skills: {
		typescript: "TypeScript",
		javascript: "JavaScript",
		angular: "Angular",
		react: "React",
		nextjs: "Next.js",
		tailwindcss: "Tailwind CSS",
	},
	secondary_skills: {
		nodejs: "Node.js",
		express: "Express",
		prisma: "Prisma",
		postgresql: "PostgreSQL / SQL",
		zustand: "Zustand",
		signals: "Signals",
		reactnative: "React Native",
		expo: "Expo",
		socketio: "Socket.io",
		electron: "Electron",
	},
	additional_skills: {
		docker: "Docker",
		linux: "Linux",
		aws: "AWS",
		github: "GitHub",
		gitlab: "GitLab",
		figma: "Figma",
		design_thinking: "Design Thinking",
		problem_solving: "Problem Solving",
		agile: "Scrum / Agile",
		empathy: "Empathy / Communication",
		tenacity: "Tenacity",
		python: "Python",
	},
} as const

export const contact = {
	title: "Contact",
	subtitle: "Let's talk.",
	form: {
		name: "Name",
		namePlaceholder: "Your name",
		email: "Email",
		emailPlaceholder: "you@example.com",
		message: "Message",
		messagePlaceholder: "What's on your mind?",
		submit: "Send message",
	},
	error: {
		nameRequired: "Name is required",
		nameMinLength: "Name must be at least 2 characters",
		nameMaxLength: "Name must not exceed 100 characters",
		emailRequired: "Email is required",
		emailInvalid: "Invalid email format",
		messageRequired: "Message is required",
		messageMinLength: "Message must be at least 10 characters",
		messageMaxLength: "Message must not exceed 5000 characters",
	},
	messages: {
		success: "Message sent successfully!",
		transmitted: "Sent!",
		failed: "Failed to send. Please try again.",
		connectionLost: "Connection lost. Please try again.",
		transmitting: "Sending...",
		sendMessage: "Send message",
	},
} as const

export const footer = {
	tagline: "Built with craft.",
	backToTop: "Back to top",
} as const

export const meta = {
	home: {
		title: "Cristhofer Pincetti — Software Engineer",
		description:
			"Software Engineer specializing in web development, mobile apps, and full-stack solutions. Expert in React, Next.js, Node.js, and modern web technologies.",
	},
} as const
