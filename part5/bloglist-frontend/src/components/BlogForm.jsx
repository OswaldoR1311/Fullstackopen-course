import { Button, TextField } from '@mui/material'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [likes, setLikes] = useState(0)

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title,
			author,
			url,
			likes,
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}
	return (
		<div>
			<h3>Create new blog</h3>
			<form onSubmit={addBlog}>
				<div>
					<TextField
						variant="outlined"
						size="small"
						value={title}
						onChange={({ target }) => setTitle(target.value)}
						label="title"
						sx={{ marginBottom: 2, width: '300px' }}
					/>
				</div>
				<div>
					<TextField
						variant="outlined"
						size="small"
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
						label="author"
						sx={{ marginBottom: 2, width: '300px' }}
					/>
				</div>
				<div>
					<TextField
						variant="outlined"
						size="small"
						value={url}
						onChange={({ target }) => setUrl(target.value)}
						label="url"
						sx={{ width: '300px' }}
					/>
				</div>
				<br />
				<Button variant="contained" size="small" type="submit">
					create
				</Button>
			</form>
		</div>
	)
}

export default BlogForm
