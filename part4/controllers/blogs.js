const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { userExtractor } = require('../utils/middleware')

// blogRouter.get('/', async (request, response) => {
// 	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
// 	response.json(blogs)
// })

blogRouter.get('/', userExtractor, async (request, response) => {
	const userId = request.user.id

	const blogs = await Blog.find({ user: userId }).populate('user', {
		username: 1,
		name: 1,
	})

	response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
	const { title, author, url, likes } = request.body

	const user = request.user

	if (!title || !url) {
		return response.status(400).json({ error: 'Missing title or URL' })
	}

	const newBlog = new Blog({
		title,
		author,
		url,
		likes: likes || 0,
		user: user.id,
	})

	const savedBlog = await newBlog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!decodedToken) {
		return response.status(400).json({ error: 'token invalid' })
	}

	const blog = await Blog.findById(request.params.id)

	if (!blog) {
		return response.status(404).json({ error: 'blog not found' })
	}

	if (blog.user.toString() !== decodedToken.id.toString()) {
		return response
			.status(400)
			.json({ error: 'only the creator can delete this blog' })
	}

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
