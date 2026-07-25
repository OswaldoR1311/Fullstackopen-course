import { useAnecdotes } from '../hooks'

const AnecdoteList = () => {
	const { deleteAnecdoteF, anecdotes } = useAnecdotes()
	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.length === 0 ? (
				<div>
					<h4>You dont have anecdotes yet.</h4>
				</div>
			) : (
				<ul>
					{anecdotes.map((anecdote) => (
						<li key={anecdote.id}>
							{anecdote.content}
							<button
								type="button"
								onClick={() => deleteAnecdoteF(anecdote.id)}
							>
								delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default AnecdoteList
