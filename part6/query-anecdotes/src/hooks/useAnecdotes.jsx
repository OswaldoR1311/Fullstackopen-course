import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	createAnecdote,
	getAnecdotes,
	voteAnecdote,
} from '../services/anecdote'

export function useAnecdotes() {
	const queryClient = useQueryClient()

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
