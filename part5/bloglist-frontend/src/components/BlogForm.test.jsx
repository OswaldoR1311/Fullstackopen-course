import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('the form calls the event handler with the right details', async () => {
	const mockCreateBlog = vi.fn()
	const user = userEvent.setup()

	render(<BlogForm createBlog={mockCreateBlog} />)

	const titleInput = screen.getByPlaceholderText('title')
	const authorInput = screen.getByPlaceholderText('author')
	const urlInput = screen.getByPlaceholderText('url')

	const createButton = screen.getByText('create')

	await user.type(titleInput, 'Testing blog')
	await user.type(authorInput, 'oswaldo')
	await user.type(urlInput, 'https://oswaldo.com')
	await user.click(createButton)

	screen.debug()

	expect(mockCreateBlog.mock.calls).toHaveLength(1)
	expect(mockCreateBlog.mock.calls[0][0].title).toBe('Testing blog')
	expect(mockCreateBlog.mock.calls[0][0].author).toBe('oswaldo')
	expect(mockCreateBlog.mock.calls[0][0].url).toBe('https://oswaldo.com')
})
