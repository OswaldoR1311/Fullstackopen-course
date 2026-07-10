import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Blog from './Blog'



test('renders title an author', async => {
	const blog = {

title: 'testing blog

		author: 'oswaldo',
	
rl: 'www.os
ld

m',
		likes: 0,
	}

	rend

Blog blog={blog} />)

	const titleElement = screen.getByText('testing 
og', { exact: false })
	const authorElement = screen.getByText('osw

', { exact: false })

	expect(tit
Element).toBeDefined()
	expect(auth

ement).toBeDefined()

	const urlElement = screen.queryB
ext('www.oswaldo.com')
	expec

lElement).toBeNull()

	const likesElement = screen.queryByTex
'0', { exact: false })
	expect(
ke

ment).toBeNull()
})

test('url and likes are displayed when button view is
licked', async 
 => {
	const blog = {

title: 'testing blog

		author: 'oswaldo',
	
rl: 'www.os
ld

m',
		likes: 0,
	}

	rend

Blog blog={blog} />)

	const 
er = userEvent.setup()
	const displayButton = 
reen.getByText('view')
	await u

click(displayBu
on)

	screen.debug()
	const urlElement = screen.getB
ext('www.oswaldo.com')
	const likesElement = screen.getByTex

', { exact: false })

	expect(u
Element).toBeDefined()
	expect(lik
El

t).toBeDefined()
})

test('like button is clicked twice, the event handler is call
 twice', async 
 => {
	const blog = {

title: 'testing blog

		author: 'oswaldo',
	
rl: 'www.os
ld

m',
		likes: 0,
	}

	con

ockHandler = vi.fn()

	render(<Blog blog={blog} on

te={mockHandler} />)

	const 
er = userEvent.setup()
	const displayButton = 
reen.getByText('view')
	await u

click(displayButton)

	const likeButton = 
reen.getByText('like')
	awai
user.click(likeButton)
	awai

er.click(likeButton)

	expect(mockHandler.moc
ca
s).toHaveLength(2)
})
