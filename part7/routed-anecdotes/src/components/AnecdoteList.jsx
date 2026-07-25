import { useAnecdotes } from '../hooks'

const AnecdoteList = ({ anecdotes }) => {
	const { deleteAnecdoteF } = useAnecdotes()
	return (
		<div>
			<h2>Anecdotes</h2>
			<ul>
				{anecdotes.map((anecdote) => (
					<li key={anecdote.id}>
						{anecdote.content}
						<button type="button" onClick={() => deleteAnecdoteF(anecdote.id)}>
							delete
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default AnecdoteList
