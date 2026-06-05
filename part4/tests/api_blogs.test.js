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

after(async () => {
  await mongoose.connection.close()
})
