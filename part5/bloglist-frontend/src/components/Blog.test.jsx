import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('test', () => {
	const blog = {
		title: 'testing blog',
		author: 'oswaldo',
		url: 'www.oswaldo.com',
		likes: 0,
	}

	render(<Blog blog={blog} />)

	screen.debug()

	const titleElement = screen.getByText('testing blog')
	const authorElement = screen.getByText('oswaldo', { exact: false })
	const urlElement = screen.getByText('www.oswaldo.com')
	const likesElement = screen.getByText(0)

	expect(titleElement).toBeDefined()
	expect(authorElement).toBeDefined()

	expect(urlElement).not.toBeVisible()
	expect(likesElement).not.toBeVisible()
})
