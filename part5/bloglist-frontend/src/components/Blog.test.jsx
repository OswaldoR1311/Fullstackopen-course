import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { expect } from 'vitest'
import Blog from './Blog'

test('renders title and author', async () => {
	const blog = {
		id: '1',
		title: 'testing blog',
		author: 'oswaldo',
		url: 'www.oswaldo.com',
		likes: 5,
		user: { username: 'creator', name: 'Creator User', id: 'u1' },
	}

	function renderBlogs(props = {}) {
		render(
			<MemoryRouter initialEntries={[`/blogs/${blog.id}`]}>
				<Routes>
					<Route
						path="/blogs/:id"
						element={<Blog blogs={[blog]} {...props} />}
					/>
				</Routes>
			</MemoryRouter>,
		)
	}

	test('blog info and likes are displayed, but no buttons for unauthenticated user', () => {
		renderBlogs({ user: null })

		expect(screen.getByText('testing blog', { exact: false })).toBeDefined()
		expect(screen.getByText('oswaldo', { exact: false })).toBeDefined()
		expect(screen.getByText('likes 5', { exact: false })).toBeDefined()
		expect(screen.queryByText('like')).toBeNull()
		expect(screen.queryByText('remove')).toBeNull()
	})

	test('only like button is shown to a logged-in non-creator user', () => {
		renderBlogs({ user: { username: 'someoneelse', name: 'Other User' } })

		expect(screen.getByText('like')).toBeDefined()
		expect(screen.queryByText('remove')).toBeNull()
	})

	test('creator sees both like and remove buttons', () => {
		renderBlogs({ user: { username: 'creator', name: 'Creator User' } })

		expect(screen.getByText('like')).toBeDefined()
		expect(screen.getByText('remove')).toBeDefined()
	})
})
// 	const titleElement = screen.getByText('testing blog', { exact: false })
// 	const authorElement = screen.getByText('oswaldo', { exact: false })

// 	expect(titleElement).toBeDefined()
// 	expect(authorElement).toBeDefined()

// 	const urlElement = screen.queryByText('www.oswaldo.com')
// 	expect(urlElement).toBeNull()

// 	const likesElement = screen.queryByText('0', { exact: false })
// 	expect(likesElement).toBeNull()
// })

// test('url and likes are displayed when button view is clicked', async () => {
// 	const blog = {
// 		title: 'testing blog',
// 		author: 'oswaldo',
// 		url: 'www.oswaldo.com',
// 		likes: 0,
// 	}

// 	render(<Blog blog={blog} />)

// 	const user = userEvent.setup()
// 	const displayButton = screen.getByText('view')
// 	await user.click(displayButton)

// 	screen.debug()
// 	const urlElement = screen.getByText('www.oswaldo.com')
// 	const likesElement = screen.getByText('0', { exact: false })

// 	expect(urlElement).toBeDefined()
// 	expect(likesElement).toBeDefined()
// })

// test('like button is clicked twice, the event handler is called twice', async () => {
// 	const blog = {
// 		title: 'testing blog',
// 		author: 'oswaldo',
// 		url: 'www.oswaldo.com',
// 		likes: 0,
// 	}

// 	const mockHandler = vi.fn()

// 	render(<Blog blog={blog} onUpdate={mockHandler} />)

// 	const user = userEvent.setup()
// 	const displayButton = screen.getByText('view')
// 	await user.click(displayButton)

// 	const likeButton = screen.getByText('like')
// 	await user.click(likeButton)
// 	await user.click(likeButton)

// 	expect(mockHandler.mock.calls).toHaveLength(2)
// })
