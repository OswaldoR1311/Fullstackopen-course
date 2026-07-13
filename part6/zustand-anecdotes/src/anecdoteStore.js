import { create } from 'zustand'
import { useNotificationStore } from './notificationStore'
import anecdoteService from './services/anecdote'

const useAnecdoteStore = create((set, get) => ({
	// anecdotes: anecdotesAtStart.map(asObject),
	anecdotes: [],
	filter: '',
	notification: null,
	actions: {
		// vote: (id) =>
		// 	set((state) => ({
		// 		anecdotes: state.anecdotes.map((a) =>
		// 			a.id === id ? { ...a, votes: a.votes + 1 } : a
		// 		),
		// 	})),
		vote: async (id) => {
			const anecdote = get().anecdotes.find((a) => a.id === id)
			const updated = await anecdoteService.updateVotes(id, {
				...anecdote,
				votes: anecdote.votes + 1,
			})
			set((state) => ({
				anecdotes: state.anecdotes.map((anecdote) => {
					return anecdote.id === id ? updated : anecdote
				}),
			}))
			useNotificationStore
				.getState()
				.actions.showNotification(`You voted ${anecdote.content}`)
		},
		addAnecdote: async (content) => {
			const newAnecdote = await anecdoteService.newAnecdote(content)
			set((state) => ({ anecdotes: [...state.anecdotes, newAnecdote] }))
		},
		setFilter: (value) => set(() => ({ filter: value })),
		initializeAnecdotes: async () => {
			const anecdotes = await anecdoteService.getAllAnecdotes()
			set(() => ({ anecdotes: anecdotes }))
		},
		deleteAnecdote: async (id) => {
			const deletedAnecdote = await anecdoteService.deleteAnecdote(id)
			set((state) => ({
				anecdotes: state.anecdotes.filter((a) => a.id !== id),
			}))
			useNotificationStore
				.getState()
				.actions.showNotification(`${deletedAnecdote.content} removed`)
		},
	},
}))

export const useAnecdotes = () => {
	const anecdotes = useAnecdoteStore((state) => state.anecdotes)
	const filter = useAnecdoteStore((state) => state.filter)
	if (filter) return anecdotes.filter((a) => a.content.includes(filter))
	return anecdotes
}
export const useAnecdoteActions = () =>
	useAnecdoteStore((state) => state.actions)

export const useAnecdoteNotification = () =>
	useAnecdoteStore((state) => state.notification)
