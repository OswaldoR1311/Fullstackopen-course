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
	const findedBlog = await Blog.findById(request.params.id)
	if (!findedBlog) return response.status(404).end()
	findedBlog.title = title
	findedBlog.author = author
	findedBlog.url = url
	findedBlog.likes = likes

	const updatedNote = await findedBlog.save()
	response.json(updatedNote)
})

module.exports = blogRouter
