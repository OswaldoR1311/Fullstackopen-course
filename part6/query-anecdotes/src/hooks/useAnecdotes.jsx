import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	createAnecdote,
	getAnecdotes,
	voteAnecdote,
} from '../services/anecdote'
import useNotification from './useNotification'

export function useAnecdotes() {
	const queryClient = useQueryClient()
	const { handleNotification } = useNotification()

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		refetchOnWindowFocus: false,
		retry: 1,
	})

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
		},
		onError: () => {
			handleNotification('anecdote too short')
			setTimeout(() => {
				handleNotification(null)
			})
		},
	})

	const updateVoteMutation = useMutation({
		mutationFn: voteAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		},
	})

	return {
		anecdotes: result.data,
		isPending: result.isPending,
		addAnecdote: (newA) => newAnecdoteMutation.mutate(newA),
		updateVote: (anecdote) => {
			updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
		},
	}
}
