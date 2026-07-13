import { useAnecdoteActions } from '../store'

function AnecdoteForm() {
	const { add } = useAnecdoteActions()

	function generateRandomID() {
		return Number(Math.random() * 1000000)
	}

	function addAnecdote(event) {
		event.preventDefault()
		const content = event.target.anecdote.value
		const newAnecdote = { id: generateRandomID(), content, votes: 0 }
		add(newAnecdote)
	}
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
