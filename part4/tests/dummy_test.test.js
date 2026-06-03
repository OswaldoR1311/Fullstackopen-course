const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes } = require('../utils/list_helper')

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
