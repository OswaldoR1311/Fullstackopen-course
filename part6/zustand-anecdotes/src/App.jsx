import { useEffect } from 'react'
import { useAnecdoteActions } from './anecdoteStore'
import AnecdotesForm from './components/AnecdotesForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
	const { initializeAnecdotes } = useAnecdoteActions()

	useEffect(() => {
		initializeAnecdotes()
	}, [initializeAnecdotes])

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdotesList />
			<AnecdotesForm />
		</div>
	)
}

export default App
