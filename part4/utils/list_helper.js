const lodash = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc + curr.likes, 0)

const favoriteBlog = (blogs) => lodash.maxBy(blogs, 'likes')

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null

	const blogsByAuthor = lodash.groupBy(blogs, 'author')
	const authorCounts = lodash.map(blogsByAuthor, (authorBlogs, author) => ({
		author: author,
		blogs: authorBlogs.length,
	}))

	return lodash.maxBy(authorCounts, 'blogs')
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) return null

	const blogsByAuthor = lodash.groupBy(blogs, 'author')

	const authorLikes = lodash.map(blogsByAuthor, (authorBlogs, author) => ({
		author: author,
		likes: lodash.sumBy(authorBlogs, 'likes'),
	}))

	return lodash.maxBy(authorLikes, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
