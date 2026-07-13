const baseUrl = 'http://localhost:3001/anecdotes'

async function getAllAnecdotes() {
	const response = await fetch(baseUrl)
	if (!response.ok) throw new Error('Failed to fectch anecdotes')

	return await response.json()
}

async function newAnecdote(content) {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ content, votes: 0 }),
	}
	const response = await fetch(baseUrl, options)

	if (!response.ok) throw new Error('Failed to add anecdote')
	return await response.json()
}

async function updateVotes(id, anecdote) {
	const options = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(anecdote),
	}
	const response = await fetch(`${baseUrl}/${id}`, options)
	if (!response.ok) throw new Error('Failed to update votes')

	return await response.json()
}

async function deleteAnecdote(id) {
	const options = {
		method: 'DELETE',
	}
	const response = await fetch(`${baseUrl}/${id}`, options)

	if (!response.ok) throw new Error('Failed to remove anecdote')

	return await response.json()
}

export default { getAllAnecdotes, newAnecdote, updateVotes, deleteAnecdote }
