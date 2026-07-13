import { useAnecdoteActions, useAnecdotes } from './store'

const App = () => {
	const anecdotes = useAnecdotes()
	const { vote, add } = useAnecdoteActions()

	function addAnecdote(event) {
		event.preventDefault()
		const content = event.target.anecdote.value
		const newAnecdote = { content, votes: 0 }
		add(newAnecdote)
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
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

export default App
