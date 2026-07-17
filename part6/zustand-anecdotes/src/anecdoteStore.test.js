import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useAnecdoteStore, {
	useAnecdoteActions,
	useAnecdotes,
} from './anecdoteStore'
import anecdoteService from './services/anecdote'

const anecdotes = [
	{
		id: 1,
		content: 'test 1',
		votes: 2,
	},
	{
		id: 2,
		content: 'test 2',
		votes: 3,
	},
	{
		id: 3,
		content: 'test 3',
		votes: 10,
	},
]

vi.mock('./services/anecdote', () => ({
	default: {
		getAllAnecdotes: vi.fn(),
		createNew: vi.fn(),
		updateVotes: vi.fn(),
	},
}))

beforeEach(() => {
	useAnecdoteStore.setState({ anecdotes: [], filter: '' })
	vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
	it('initialize loads anecdotes from service', async () => {
		const mockAnecdotes = [{ id: 1, content: 'test anecdote', votes: 5 }]
		anecdoteService.getAllAnecdotes.mockResolvedValue(mockAnecdotes)

		const { result } = renderHook(() => useAnecdoteActions())

		await act(async () => {
			await result.current.initializeAnecdotes()
		})

		const { result: anecdotesResult } = renderHook(() => useAnecdotes())
		expect(anecdotesResult.current).toEqual(mockAnecdotes)
	})

	it('initialize loads anecdotes sorted from service', async () => {
		anecdoteService.getAllAnecdotes.mockResolvedValue(anecdotes)

		const { result } = renderHook(() => useAnecdoteActions())

		await act(async () => {
			await result.current.initializeAnecdotes()
		})

		const { result: anecdotesResult } = renderHook(() => useAnecdotes())

		const expectedSorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

		expect(anecdotesResult.current).toEqual(expectedSorted)
	})

	it('voting increases the number of votes', async () => {
		const anecdoteToTest = { id: 1, content: 'test', votes: 1 }
		useAnecdoteStore.setState({ anecdotes: [anecdoteToTest] })
		anecdoteService.updateVotes.mockResolvedValue({
			...anecdoteToTest,
			votes: 2,
		})

		const { result } = renderHook(() => useAnecdoteActions())
		await act(async () => {
			await result.current.vote(1)
		})

		const { result: anecdotesResult } = renderHook(() => useAnecdotes())
		expect(anecdotesResult.current[0].votes).toBe(2)
	})
})

describe('useAnecdotes filtering', () => {
	const anecdotesList = [
		{id: 1, content: 'A', votes: 5},
		{id: 2, content: 'B', votes: 3}
	]

	beforeEach(() => {
		useAnecdoteStore.setState({anecdotes: anecdotesList, filter: ''})
	})

	it('returns all anecdotes with no filter', () => {
		const {result} = renderHook(() => useAnecdotes())
		expect(result.current).toHaveLength(2)
	})

	it('returns anecdotes matching the filter', () => {
		useAnecdoteStore.setState({anecdotes: anecdotesList, filter: 'A'})
		const {result} = renderHook(() => useAnecdoteStore())
		expect(result.current).toEqual([anecdotesList[0]])
	})

	it('returns empty array when no anecdote matches the filter', () => {
		useAnecdoteStore.setState({anecdotes: anecdotesList, filter: 'zzz'})
		const {result} = renderHook(() => useAnecdotes())
		expect(result.current).toEqual([])
	})
})
