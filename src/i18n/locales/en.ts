export const nav = {
	home: "Home",
	about: "Pilot's Log",
	experience: "Mission Log",
	skills: "Arsenal",
	contact: "Contact",
} as const

export const common = {
	readMore: "Read more",
	loading: "Loading...",
	error: "An error occurred",
	success: "Success!",
} as const

export const about = {
	title: "The Pilot's Log",
	subtitle: "Decoding the bio-data of the entity behind the keyboard.",
	identity: "Identity",
	name: "Cristhofer Pincetti",
	class: "Class",
	role: "Full Stack Engineer",
	location: "Location",
	locationValue: "Geo-Stationary Orbit (Coquimbo, CL)",
	status: "Status",
	statusValue: "Currently building scalable systems and drinking excessive amounts of dark roast.",
	quote:
		"// Passionate about clean code, UI micro-interactions, and exploring the frontiers of web technology. When not coding, I'm likely refactoring my life configuration or debugging reality.",
} as const

export const experience = {
	title: "Mission Log",
	subtitle: "Detailed technical trajectory through the full software development lifecycle.",
	jobs: [
		{
			title: "Software Engineer",
			company: "Sixbell",
			description:
				"Participating in Microfrontend (MFE) architecture, leading the design and development of new modules for large-scale web products. I spearheaded the 'Sixbell Telco UI Kit' (NPM) and technical stack modernization toward modular design patterns. I act as an innovation driver, identifying and executing cross-cutting improvements across the product architecture to raise UX, quality, and scalability standards.",
			period: "Nov 2023 - Present",
			tags: ["Angular", "MFE", "UI Kit", "UI/UX", "Docker", "NPM"],
		},
		{
			title: "Lead Developer (Magic Key)",
			company: "Innovation Project",
			description:
				"Developed a multi-platform tool built with Electron that lets you use your phone as a remote macro-pad for your PC (Stream Deck style). I implemented real-time communication using Socket.io for fast response and handled the entire project: from brand design and web admin panel to server deployment.",
			period: "Jan 2024 - Mar 2024",
			tags: ["Electron", "Socket.io", "Node.js", "React", "Real-time"],
		},
		{
			title: "Lead Developer (Soltec Water)",
			company: "University of La Serena",
			description:
				"Designed and built a water management system for real-time resource monitoring. I implemented data models for field telemetry and route logistics, developing analytical dashboards to optimize critical processes and track parameters like pH and flow.",
			period: "Sep 2023 - Mar 2024",
			tags: ["Next.js", "Prisma", "AWS", "PostgreSQL", "Tailwind"],
		},
		{
			title: "Software Engineer (Adhara ERP)",
			company: "Hospital San Juan de Dios",
			description:
				"Key developer for the Pharmacy and Finance modules of the Adhara ERP. I integrated peripheral hardware and custom JavaScript logic for medical supply traceability, optimizing operational efficiency and prescription workflows in a real-world hospital environment.",
			period: "Oct 2022 - Sep 2023",
			tags: ["Genexus", "JavaScript", "ERP", "Logistics", "SQL"],
		},
	],
} as const
export const skills = {
	title: "Technical Arsenal",
	subtitle: "Core systems and satellite technologies orbiting the central fuel source.",
	core: "Caffeine Core",
	mastery: "Mastery",
	core_skills: {
		typescript: "TypeScript",
		angular: "Angular",
		nextjs: "Next.js / React",
		tailwindcss: "Tailwind CSS",
	},
	secondary_skills: {
		figma: "Figma (UX Expert)",
		nodejs: "Node.js / Express",
		prisma: "Prisma / SQL",
		zustand: "Zustand / Signals",
		reactnative: "React Native / Expo",
		agile: "Scrum / Agile",
	},
	additional_skills: {
		docker: "Docker / Linux",
		github: "GitHub / GitLab",
		design_thinking: "Design Thinking",
		problem_solving: "Problem Solving",
		empathy: "Empathy / Communication",
		tenacity: "Tenacity",
		socketio: "Socket.io / Electron",
		python: "Python",
	},
} as const

export const contact = {
	title: "Establish Comm Link",
	subtitle: "Initiate sub-space transmission to the main relay station.",
	form: {
		senderId: "Sender ID",
		senderIdPlaceholder: "Protocol: Name",
		frequency: "Frequency",
		frequencyPlaceholder: "Identifier: email@nebula.com",
		transmission: "Transmission",
		transmissionPlaceholder: "Payload: Type your message here...",
		submit: "Send Data Burst",
	},
	error: {
		nameRequired: "Sender ID is required",
		nameMinLength: "Sender ID must be at least 2 characters",
		nameMaxLength: "Sender ID must not exceed 100 characters",
		emailRequired: "Frequency is required",
		emailInvalid: "Invalid frequency format",
		messageRequired: "Transmission payload required",
		messageMinLength: "Transmission must be at least 10 characters",
		messageMaxLength: "Transmission must not exceed 5000 characters",
	},
	messages: {
		success: "Transmission successful! Message received.",
		transmitted: "Transmitted!",
		failed: "Transmission failed. Please try again.",
		connectionLost: "Connection lost. Please try again.",
		transmitting: "Transmitting...",
		sendDataBurst: "Send Data Burst",
	},
} as const

export const footer = {
	tagline: "Navigating the digital cosmos.",
	backToTop: "Back to Zenith",
} as const

export const meta = {
	home: {
		title: "Cristhofer Pincetti - Software Engineer",
		description:
			"Software Engineer specializing in web development, mobile apps, and full-stack solutions. Expert in React, Next.js, Node.js, and modern web technologies.",
	},
} as const
