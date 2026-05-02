"use client"

import { Toaster as Sonner } from "sonner"

export default function Toaster() {
	return (
		<Sonner
			position="bottom-right"
			toastOptions={{
				style: {
					background: "rgba(30, 25, 35, 0.95)",
					color: "#fff",
					border: "1px solid rgba(131, 59, 145, 0.3)",
				},
			}}
		/>
	)
}
