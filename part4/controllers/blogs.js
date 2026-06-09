const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const { title, author, url, likes } = request.body

	if (!title || !url) {
		return response.status(400).json({ error: 'Missing title or URL' })
	}

	const newBlog = new Blog({
		title,
		author,
		url,
		likes,
	})

	const savedBlog = await newBlog.save()
	response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
	const { title, author, url, likes } = request.body

	const blogToUpdate = { title, author, url, likes }
	const updatedLikesForBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		blogToUpdate,
		{ new: true, runValidators: true, context: 'query' }
	)

	if (!updatedLikesForBlog) {
		console.log('The blog does not exist')
		return response.status(404).end()
	}

	console.log('Blog updated successfully')
	await response.json(updatedLikesForBlog)
})

module.exports = blogRouter
