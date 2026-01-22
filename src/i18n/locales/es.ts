export const nav = {
	home: "Inicio",
	about: "Bitácora",
	experience: "Misiones",
	skills: "Arsenal",
	contact: "Contacto",
} as const

export const common = {
	readMore: "Leer más",
	loading: "Cargando...",
	error: "Ocurrió un error",
	success: "¡Éxito!",
} as const

export const about = {
	title: "Bitácora del Piloto",
	subtitle: "Decodificando los bio-datos de la entidad detrás del teclado.",
	identity: "Identidad",
	name: "Cristhofer Pincetti",
	class: "Clase",
	role: "Ingeniero Full Stack",
	location: "Ubicación",
	locationValue: "Órbita Geo-Estacionaria (Coquimbo, CL)",
	status: "Estado",
	statusValue:
		"Actualmente construyendo sistemas escalables y bebiendo cantidades excesivas de café.",
	quote:
		"// Apasionado por el código limpio, las micro-interacciones de UI y explorar las fronteras de la tecnología web. Cuando no estoy programando, probablemente estoy refactorizando mi configuración de vida o debuggeando la realidad.",
} as const

export const experience = {
	title: "Registro de Misiones",
	subtitle: "Trayectoria técnica detallada a través del ciclo de vida completo del software.",
	jobs: [
		{
			title: "Software Engineer",
			company: "Sixbell",
			description:
				"Participo en la implementación de Microfrontends (MFE), liderando el diseño y desarrollo de nuevos módulos para productos web de gran escala. Impulsé el 'UI Kit Sixbell Telco' (NPM) y la modernización del stack técnico hacia patrones de diseño modulares. Actúo como motor de innovación, identificando y ejecutando mejoras transversales en la arquitectura del producto para elevar los estándares de UX, calidad y escalabilidad.",
			period: "Nov 2023 - Presente",
			tags: ["Angular", "MFE", "UI Kit", "UI/UX", "Docker", "NPM"],
		},
		{
			title: "Lead Developer (Magic Key)",
			company: "Proyecto de Innovación",
			description:
				"Desarrollé una herramienta multiplataforma con Electron que permite usar el celular como un panel de control remoto para el PC (estilo Stream Deck). Implementé la comunicación en tiempo real con Socket.io para lograr una respuesta rápida y gestioné todo el flujo: desde el diseño de la identidad y el panel de administración web, hasta el despliegue del servidor.",
			period: "Ene 2024 - Mar 2024",
			tags: ["Electron", "Socket.io", "Node.js", "React", "Real-time"],
		},
		{
			title: "Lead Developer (Soltec Water)",
			company: "Universidad de La Serena",
			description:
				"Diseñé y construí un sistema de gestión hídrica para el monitoreo de recursos en tiempo real. Implementé modelos de datos para telemetría de campo y logística de rutas, desarrollando dashboards analíticos para la optimización de procesos críticos y el seguimiento de parámetros como pH y caudal.",
			period: "Sep 2023 - Mar 2024",
			tags: ["Next.js", "Prisma", "AWS", "PostgreSQL", "Tailwind"],
		},
		{
			title: "Software Engineer (ERP Adhara)",
			company: "Hospital San Juan de Dios",
			description:
				"Desarrollador clave en los módulos de Farmacia y Finanzas del ERP Adhara. Integré hardware periférico y lógica personalizada en JavaScript para la trazabilidad de insumos médicos, optimizando la eficiencia operativa y el seguimiento de flujos de recetas en un entorno hospitalario real.",
			period: "Oct 2022 - Sep 2023",
			tags: ["Genexus", "JavaScript", "ERP", "Logística", "SQL"],
		},
	],
} as const

export const skills = {
	title: "Arsenal Técnico",
	subtitle: "Sistemas centrales y tecnologías satélite orbitando la fuente de combustible central.",
	core: "Núcleo de Cafeína",
	mastery: "Dominio",
} as const

export const contact = {
	title: "Establecer Enlace Comm",
	subtitle: "Iniciar transmisión sub-espacial a la estación de relevo principal.",
	form: {
		senderId: "ID del Remitente",
		senderIdPlaceholder: "Protocolo: Nombre",
		frequency: "Frecuencia",
		frequencyPlaceholder: "Identificador: email@nebula.com",
		transmission: "Transmisión",
		transmissionPlaceholder: "Carga de datos: Escribe tu mensaje aquí...",
		submit: "Enviar Ráfaga de Datos",
	},
	error: {
		nameRequired: "Se requiere ID del remitente",
		nameMinLength: "El ID del remitente debe tener al menos 2 caracteres",
		nameMaxLength: "El ID del remitente no debe exceder 100 caracteres",
		emailRequired: "Se requiere frecuencia",
		emailInvalid: "Formato de frecuencia inválido",
		messageRequired: "Se requiere carga de transmisión",
		messageMinLength: "La transmisión debe tener al menos 10 caracteres",
		messageMaxLength: "La transmisión no debe exceder 5000 caracteres",
	},
	messages: {
		success: "¡Transmisión exitosa! Mensaje recibido.",
		transmitted: "¡Transmitido!",
		failed: "Transmisión fallida. Por favor, intenta de nuevo.",
		connectionLost: "Conexión perdida. Por favor, intenta de nuevo.",
		transmitting: "Transmitiendo...",
		sendDataBurst: "Enviar Ráfaga de Datos",
	},
} as const

export const footer = {
	tagline: "Navegando el cosmos digital.",
	backToTop: "Volver al Cénit",
} as const

export const meta = {
	home: {
		title: "Cristhofer Pincetti - Ingeniero de Software",
		description:
			"Ingeniero de Software especializado en desarrollo web, aplicaciones móviles y soluciones full-stack. Experto en React, Next.js, Node.js y tecnologías web modernas.",
	},
} as const
