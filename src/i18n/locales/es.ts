export const nav = {
	home: "Inicio",
	about: "Sobre mí",
	experience: "Trabajo",
	skills: "Habilidades",
	contact: "Contacto",
} as const

export const common = {
	readMore: "Leer más",
	loading: "Cargando...",
	error: "Ocurrió un error",
	success: "¡Éxito!",
} as const

export const language = {
	switch: "Opciones de idioma",
	system: "Sistema",
	english: "English",
	spanish: "Español",
	currentSystem: "Usando idioma del sistema",
} as const

export const about = {
	title: "",
	subtitle: "",
	identity: "Identidad",
	name: "Cristhofer Pincetti",
	class: "Clase",
	role: "Ingeniero Full Stack",
	location: "Ubicación",
	locationValue: "Coquimbo, Chile",
	status: "Estado",
	statusValue: "Construyendo sistemas escalables y tomando café.",
	quote:
		"Apasionado por el código limpio, el craft de UI y explorar las fronteras de la tecnología web. Cuando no estoy programando, probablemente estoy refactorizando mi vida o debuggeando la realidad.",
} as const

export const experience = {
	title: "Trabajo",
	subtitle: "Lugares donde he construido cosas.",
	jobs: [
		{
			title: "Software Engineer",
			company: "Sixbell",
			description:
				"Liderando arquitectura de Microfrontends (MFE) y diseñando nuevos módulos para productos web a gran escala. Impulsé el 'UI Kit Sixbell Telco' (NPM) y modernicé el stack hacia patrones modulares. Ejecutando mejoras transversales en la arquitectura del producto para UX, calidad y escalabilidad.",
			period: "Nov 2023 - Presente",
			tags: ["Angular", "MFE", "UI Kit", "UI/UX", "Docker", "NPM"],
		},
		{
			title: "Lead Developer",
			company: "Magic Key",
			description:
				"Construí una herramienta multiplataforma con Electron que convierte tu celular en un panel de control remoto para PC (estilo Stream Deck). Implementé comunicación en tiempo real con Socket.io. Gestioné todo desde el diseño de marca hasta el despliegue del servidor.",
			period: "Ene 2024 - Mar 2024",
			tags: ["Electron", "Socket.io", "Node.js", "React", "Real-time"],
		},
		{
			title: "Lead Developer",
			company: "Soltec Water — Universidad de La Serena",
			description:
				"Diseñé un sistema de gestión hídrica para monitoreo de recursos en tiempo real. Construí modelos de datos para telemetría de campo y logística de rutas, creando dashboards analíticos para optimizar procesos y monitorear pH, caudal y otros parámetros.",
			period: "Sep 2023 - Mar 2024",
			tags: ["Next.js", "Prisma", "AWS", "PostgreSQL", "Tailwind"],
		},
		{
			title: "Software Engineer",
			company: "Hospital San Juan de Dios — ERP Adhara",
			description:
				"Desarrollador clave en los módulos de Farmacia y Finanzas del ERP. Integré hardware periférico y lógica JavaScript personalizada para trazabilidad de insumos médicos. Optimicé la eficiencia operativa y flujos de recetas en un entorno hospitalario real.",
			period: "Oct 2022 - Sep 2023",
			tags: ["Genexus", "JavaScript", "ERP", "Logística", "SQL"],
		},
	],
	arcana: [
		{
			name: "La Estrella del Pager",
			constellation: "Sixbell Mayor",
			reward:
				"Descubriste el cometa de soporte. Solo aparece cuando producción se porta bien cinco minutos.",
		},
		{
			name: "El Mago Macro",
			constellation: "Llave de Chispas",
			reward: "Ritual desbloqueado: cada atajo aburrido ahora te debe música de entrada dramática.",
		},
		{
			name: "El Oráculo del Agua",
			constellation: "Hydra Dashboard",
			reward: "Los gráficos susurran: hidrátate primero, optimiza después. Molestamente sabio.",
		},
		{
			name: "La Luna del Inventario",
			constellation: "Nocturno Adhara",
			reward:
				"Bonus oculto: una trazabilidad perfecta y un comprobante que por fin dice la verdad.",
		},
	],
	flip: "Revelar arcano",
	close: "Cerrar",
} as const

export const skills = {
	title: "Habilidades",
	subtitle: "Con qué trabajo.",
	core: "Core",
	mastery: "Dominio",
	core_skills: {
		typescript: "TypeScript",
		angular: "Angular",
		nextjs: "Next.js / React",
		tailwindcss: "Tailwind CSS",
	},
	secondary_skills: {
		figma: "Figma (UX)",
		nodejs: "Node.js / Express",
		prisma: "Prisma / SQL",
		zustand: "Zustand / Signals",
		reactnative: "React Native / Expo",
		agile: "Scrum / Agile",
	},
	additional_skills: {
		docker: "Docker / Linux",
		github: "GitHub / GitLab",
		design_thinking: "Pensamiento de Diseño",
		problem_solving: "Resolución de Problemas",
		empathy: "Empatía / Comunicación",
		tenacity: "Tenacidad",
		socketio: "Socket.io / Electron",
		python: "Python",
	},
} as const

export const contact = {
	title: "Contacto",
	subtitle: "Hablemos.",
	form: {
		name: "Nombre",
		namePlaceholder: "Tu nombre",
		email: "Email",
		emailPlaceholder: "tu@ejemplo.com",
		message: "Mensaje",
		messagePlaceholder: "¿En qué puedo ayudarte?",
		submit: "Enviar mensaje",
	},
	error: {
		nameRequired: "El nombre es requerido",
		nameMinLength: "El nombre debe tener al menos 2 caracteres",
		nameMaxLength: "El nombre no debe exceder 100 caracteres",
		emailRequired: "El email es requerido",
		emailInvalid: "Formato de email inválido",
		messageRequired: "El mensaje es requerido",
		messageMinLength: "El mensaje debe tener al menos 10 caracteres",
		messageMaxLength: "El mensaje no debe exceder 5000 caracteres",
	},
	messages: {
		success: "¡Mensaje enviado exitosamente!",
		transmitted: "¡Enviado!",
		failed: "Error al enviar. Por favor, intenta de nuevo.",
		connectionLost: "Conexión perdida. Por favor, intenta de nuevo.",
		transmitting: "Enviando...",
		sendMessage: "Enviar mensaje",
	},
} as const

export const footer = {
	tagline: "Hecho con craft.",
	backToTop: "Volver arriba",
} as const

export const meta = {
	home: {
		title: "Cristhofer Pincetti — Ingeniero de Software",
		description:
			"Ingeniero de Software especializado en desarrollo web, aplicaciones móviles y soluciones full-stack. Experto en React, Next.js, Node.js y tecnologías web modernas.",
	},
} as const
