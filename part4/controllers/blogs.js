const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const { title, author, url, likes, userId } = request.body

	const user = await User.findById(userId)

	if (!user) {
		return response.status(400).json({ error: 'userId missing or not valid' })
	}

	if (!title || !url) {
		return response.status(400).json({ error: 'Missing title or URL' })
	}

	const newBlog = new Blog({
		title,
		author,
		url,
		likes,
		user: user._id,
	})

	const savedBlog = await newBlog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

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
