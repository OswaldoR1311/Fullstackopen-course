const { test, describe } = require('node:test')
const assert = require('node:assert')
const {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
} = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = dummy(blogs)
	assert.strictEqual(result, 1)
})

describe('total likes', () => {
	test('of empty list is zero', () => {
		const blogs = []
		const result = totalLikes(blogs)
		assert.strictEqual(result, 0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const blogTest = [
			{
				title: 'Game of Thrones',
				author: 'Oswaldo Rodríguez',
				likes: 5,
			},
		]
		const result = totalLikes(blogTest)
		assert.strictEqual(result, blogTest[0].likes)
	})

	test('of a bigger list is calculated right', () => {
		const mockBlogs = [
			{ title: 'Game of Thrones', author: 'Oswaldo Rodríguez', likes: 5 },
			{ title: 'From', author: 'Boyd', likes: 7 },
		]
		const result = totalLikes(mockBlogs)
		assert.strictEqual(result, mockBlogs[0].likes + mockBlogs[1].likes)
	})
})

describe('favorite blog', () => {
	test('blog with most likes', () => {
		const mockBlogs = [
			{ title: 'Game of Thrones', author: 'Oswaldo Rodríguez', likes: 5 },
			{ title: 'From', author: 'Boyd', likes: 7 },
		]

		const result = favoriteBlog(mockBlogs)
		assert.deepStrictEqual(result, mockBlogs[1])
	})
})

describe('most blogs', () => {
	test('describe an autor with the most large amount of blogs count', () => {
		const mockBlogs = [
			{ title: 'Blog 1', author: 'Oswaldo Rodríguez', likes: 1 },
			{ title: 'Blog 2', author: 'Oswaldo Rodríguez', likes: 2 },
			{ title: 'Blog 3', author: 'Boyd', likes: 5 },
		]

		const result = mostBlogs(mockBlogs)
		assert.deepStrictEqual(result, {
			author: 'Oswaldo Rodríguez',
			blogs: 2,
		})
	})
})

describe('most likes', () => {
	test('a autor with most large amount of likes', () => {
		const mockBlogs = [
			{ title: 'Blog 1', author: 'Oswaldo Rodríguez', likes: 10 },
			{ title: 'Blog 2', author: 'Boyd', likes: 15 },
			{ title: 'Blog 3', author: 'Boyd', likes: 5 },
		]

		const result = mostLikes(mockBlogs)
		assert.deepStrictEqual(result, {
			author: 'Boyd',
			likes: 20,
		})
	})
})
