import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', async () => {
	const blog = {
		title: 'testing blog',
		author: 'oswaldo',
		url: 'www.oswaldo.com',
		likes: 0,
	}

	render(<Blog blog={blog} />)

	const titleElement = screen.getByText('testing blog', { exact: false })
	const authorElement = screen.getByText('oswaldo', { exact: false })

	expect(titleElement).toBeDefined()
	expect(authorElement).toBeDefined()

	const urlElement = screen.queryByText('www.oswaldo.com')
	expect(urlElement).toBeNull()

	const likesElement = screen.queryByText('0', { exact: false })
	expect(likesElement).toBeNull()
})

test('url and likes are displayed when button view is clicked', async () => {
	const blog = {
		title: 'testing blog',
		author: 'oswaldo',
		url: 'www.oswaldo.com',
		likes: 0,
	}

	render(<Blog blog={blog} />)

	const user = userEvent.setup()
	const displayButton = screen.getByText('view')
	await user.click(displayButton)

	screen.debug()
	const urlElement = screen.getByText('www.oswaldo.com')
	const likesElement = screen.getByText('0', { exact: false })

	expect(urlElement).toBeDefined()
	expect(likesElement).toBeDefined()
})

test('like button is clicked twice, the event handler is called twice', async () => {
	const blog = {
		title: 'testing blog',
		author: 'oswaldo',
		url: 'www.oswaldo.com',
		likes: 0,
	}

	const mockHandler = vi.fn()

	render(<Blog blog={blog} onUpdate={mockHandler} />)

	const user = userEvent.setup()
	const displayButton = screen.getByText('view')
	await user.click(displayButton)

	const likeButton = screen.getByText('like')
	await user.click(likeButton)
	await user.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})
