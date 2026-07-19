import { useAnecdotes } from '../hooks/useAnecdotes'

const AnecdoteForm = () => {
	const { addAnecdote: addAnecdoteToServer } = useAnecdotes()
	// const queryClient = useQueryClient()
	// const createMutation = useMutation({
	// 	mutationFn: createAnecdote,
	// 	onSuccess: (newAnecdote) => {
	// 		const anecdotes = queryClient.getQueryData(['anecdotes'])
	// 		queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
	// 	},
	// })

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		if (content.length < 5)
			throw new Error('Content must be at least 5 characters')
		event.target.reset()
		console.log('new anecdote')
		// createMutation.mutate({ content, id: Date.now(), votes: 0 })
		addAnecdoteToServer({ content, id: Date.now(), votes: 0 })
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
