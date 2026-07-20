import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotification from '../hooks/useNotification'

const AnecdoteForm = () => {
	const { addAnecdote: addAnecdoteToServer } = useAnecdotes()
	const { handleNotification } = useNotification()

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		if (content.length < 5) {
			handleNotification('content too short')
			return
		}
		event.target.reset()
		// createMutation.mutate({ content, id: Date.now(), votes: 0 })
		addAnecdoteToServer({ content, id: Date.now(), votes: 0 })
		handleNotification(`anecdote ${content} added`)
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
