import { useState } from 'react'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)
  
    const cleanInputs = () => {
      setUsername('')
      setPassword('')
      setTitle('')
      setAuthor('')
      setUrl('')
  }
  return (
    <div>
          <h3>Create new blog</h3>
          <form onSubmit={handleAddBlog}>
            <div>
              <label>
                title
                <input
                  value={title}
                  type="text"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                author
                <input
                  value={author}
                  type="text"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                url
                <input
                  value={url}
                  type="url"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </label>
            </div>
            <br />
            <button type="submit">create</button>
          </form>
        </div>
  )
}

export default BlogForm