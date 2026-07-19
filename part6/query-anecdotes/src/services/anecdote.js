const baseUrl = 'http://localhost:3001/anecdotes'

export async function getAnecdotes() {
	const response = await fetch(baseUrl)
	if (!response.ok) throw new Error('Failed to fetch anecdotes')

	return await response.json()
}

export async function createAnecdote(newAnecdote) {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newAnecdote),
	}

	const response = await fetch(baseUrl, options)
	if (!response.ok) throw new Error('Failed to create a new anecdote')
	return await response.json()
}

export async function voteAnecdote(updatedAnecdote) {
	const options = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updatedAnecdote),
	}

	console.log(updatedAnecdote.id)

	const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)

	if (!response.ok) throw new Error('Failed to update anecdote')

	return await response.json()
}
