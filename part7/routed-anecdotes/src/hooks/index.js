import { useEffect, useState } from 'react'
import anecdotesService from '../services/anecdotes'

export function useField(type) {
	const [value, setValue] = useState('')

	function onChange(event) {
		setValue(event.target.value)
	}

	function reset() {
		setValue('')
	}

	return { type, value, onChange, reset }
}

export function useAnecdotes() {
	const [anecdotes, setAnecdotes] = useState([])

	useEffect(() => {
		anecdotesService.getAll().then((anecdotesList) => {
			setAnecdotes(anecdotesList)
		})
	}, [])

	function addAnecdote(newAnecdote) {
		anecdotesService.createNew(newAnecdote).then((newA) => {
			setAnecdotes(anecdotes.concat(newA))
		})
	}

	function deleteAnecdoteF(id) {
		anecdotesService.deleteAnecdote(id).then(() => {
			setAnecdotes((prevAnecdotes) =>
				prevAnecdotes.filter((anecdote) => anecdote.id !== id),
			)
		})
	}

	return { anecdotes, setAnecdotes, addAnecdote, deleteAnecdoteF }
}
