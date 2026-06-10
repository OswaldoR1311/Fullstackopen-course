const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { usersInDB } = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
	const baseUrl = '/api/users'

	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('secret', 10)
		const user = new User({ username: 'oswaldo', passwordHash })
		await user.save()
	})

	test('creation fails with propper status code and message if username already taken', async () => {
		const usersAtStart = await usersInDB()

		const newUser = {
			username: 'oswaldo',
			name: 'Superuser',
			password: 'oswaldo',
		}

		const result = await api
			.post(baseUrl)
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await usersInDB()
		assert(result.body.error.includes('expected `username` to be unique'))

		assert.strictEqual(usersAtEnd.length, usersAtStart.length)
	})
})

after(async () => {
	await mongoose.connection.close()
})
