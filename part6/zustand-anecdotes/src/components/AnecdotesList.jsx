import { useAnecdoteActions, useAnecdotes } from '../store'

function AnecdotesList() {
	const anecdotes = useAnecdotes()
	const { vote } = useAnecdoteActions()

	const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

	return (
		<div>
			{sortedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default AnecdotesList
