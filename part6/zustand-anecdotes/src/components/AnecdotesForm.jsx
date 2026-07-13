import { useAnecdoteActions } from '../anecdoteStore'

function AnecdoteForm() {
	const { addAnecdote } = useAnecdoteActions()

	function handleAddAnecdote(event) {
		event.preventDefault()
		const content = event.target.anecdote.value
		addAnecdote(content)
		event.target.reset()
	}
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleAddAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
