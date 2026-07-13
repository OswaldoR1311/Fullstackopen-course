import { useAnecdoteActions } from '../store'

function Filter() {
	const { setFilter } = useAnecdoteActions()

	function handleChange(event) {
		setFilter(event.target.value)
	}

	return (
		<div style={{ marginBottom: 30 }}>
			filter
			<input name="anecdote" onChange={handleChange} />
		</div>
	)
}

export default Filter
