const { after, test, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
	{
		title: 'Game of Thrones',
		author: 'George R.R Martin',
		url: 'www.gameofthrones.com',
		likes: 15,
	},
	{
		title: 'House of Dragons',
		author: 'George R.R Martin',
		url: 'www.houseofdragons.com',
		likes: 8,
	},
]

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(initialBlogs)
})

test('blogs are returned in correct format JSON', async () => {
	console.log('Beginning test')
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('the unique identifier property of the blogs is named id', async () => {
	const response = await api.get('/api/blogs')
	const ids = response.body.map((b) => b.id)
	for (const id of ids) {
		assert(id)
	}
})

test('a POST request successfully creates a new blog post', async () => {
	const newPost = {
		title: 'Formula 1',
		author: 'Max Verstappen',
		url: 'www.formula1.com',
		likes: 50,
	}
	await api
		.post('/api/blogs')
		.expect(201)
		.send(newPost)
		.expect('Content-Type', /application\/json/)

	const blogsAtStart = await api.get('/api/blogs')

	assert.strictEqual(blogsAtStart.body.length, initialBlogs.length + 1)
})

test('blog without title is not added', async () => {
	const newPost = {
		author: 'Oswaldo',
		url: 'www.oswaldo.com',
		likes: 24,
	}
	await api.post('/api/blogs').send(newPost).expect(400)
	const notesAtEnd = await api.get('/api/blogs')
	assert.strictEqual(notesAtEnd.body.length, initialBlogs.length)
})

test('blog without url is not added', async () => {
	const newPost = {
		title: 'Testing',
		author: 'Oswaldo',
		likes: 12,
	}

	await api.post('/api/blogs').send(newPost).expect(400)
	const blogsAtEnd = await api.get('/api/blogs')
	assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length)
})

test('blog can be deleted', async () => {
	const blogsAtStart = await api.get('/api/blogs')
	const blogToDelete = blogsAtStart[0]

	await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
	const blogsAtEnd = await api.get('/api/blogs')

	const ids = blogsAtEnd.map((b) => b.id)
	assert(!ids.includes(blogToDelete.id))

	assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)
})

after(async () => {
	await mongoose.connection.close()
})
