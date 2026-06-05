const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
	Blog.find({}).then((blogs) => response.json(blogs))
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

module.exports = blogRouter
