import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
	message: null,
	actions: {
		showNotification: (text, duration = 3000) => {
			set(() => ({ message: text }))

			setTimeout(() => {
				set(() => ({ message: null }))
			}, duration)
		},
	},
}))
