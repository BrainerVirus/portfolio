/**
 * Generic localStorage utility with type safety
 * Provides get, set, remove operations with optional JSON serialization
 */

type StorageKey = string & { readonly __brand: "StorageKey" }

/**
 * Create a branded storage key for type safety
 */
export function createStorageKey<T = string>(key: string): StorageKey & { __type?: T } {
	return key as StorageKey & { __type?: T }
}

interface StorageOptions {
	/** Serialize value to JSON (default: false for strings) */
	serialize?: boolean
}

/**
 * Generic localStorage manager
 */
export class StorageManager {
	/**
	 * Get a value from localStorage
	 * @param key Storage key
	 * @param options Serialization options
	 * @returns Value or null if not found
	 */
	static get<T>(key: StorageKey, options?: StorageOptions): T | string | null {
		if (typeof window === "undefined" || !localStorage) return null

		try {
			const item = localStorage.getItem(key)
			if (item === null) return null

			if (options?.serialize) {
				try {
					return JSON.parse(item) as T
				} catch (err) {
					console.warn(`[Storage] Failed to parse JSON for key "${key}":`, err)
					return null
				}
			}

			return item
		} catch (err) {
			console.warn(`[Storage] Failed to read key "${key}" from localStorage:`, err)
			return null
		}
	}

	/**
	 * Set a value in localStorage
	 * @param key Storage key
	 * @param value Value to store
	 * @param options Serialization options
	 */
	static set<T>(key: StorageKey, value: T, options?: StorageOptions): void {
		if (typeof window === "undefined" || !localStorage) return

		try {
			const serialized = options?.serialize ? JSON.stringify(value) : String(value)
			localStorage.setItem(key, serialized)
		} catch (err) {
			console.error(`[Storage] Failed to set key "${key}" in localStorage:`, err)
		}
	}

	/**
	 * Remove a key from localStorage
	 * @param key Storage key
	 */
	static remove(key: StorageKey): void {
		if (typeof window === "undefined" || !localStorage) return

		try {
			localStorage.removeItem(key)
		} catch (err) {
			console.warn(`[Storage] Failed to remove key "${key}" from localStorage:`, err)
		}
	}

	/**
	 * Clear all items from localStorage
	 */
	static clear(): void {
		if (typeof window === "undefined" || !localStorage) return

		try {
			localStorage.clear()
		} catch (err) {
			console.error("[Storage] Failed to clear localStorage:", err)
		}
	}

	/**
	 * Check if a key exists in localStorage
	 * @param key Storage key
	 */
	static has(key: StorageKey): boolean {
		if (typeof window === "undefined" || !localStorage) return false

		try {
			return localStorage.getItem(key) !== null
		} catch (err) {
			console.warn(`[Storage] Failed to check key "${key}" in localStorage:`, err)
			return false
		}
	}
}
