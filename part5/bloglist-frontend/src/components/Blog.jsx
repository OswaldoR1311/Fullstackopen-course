import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs, onUpdate, onRemove, user }) => {
	const id = useParams().id
	const blog = blogs.find((b) => b.id === id)

	if (!blog) {
		return <p>Blog not founded...</p>
	}

	const isCreator = user && blog.user && user.username === blog.user.username
	console.log(isCreator)

	return (
		<Card sx={{ marginTop: 4 }}>
			<CardContent>
				<Typography variant="h4" gutterBottom>
					{blog.title}
				</Typography>
				<Typography variant="h6" sx={{ color: 'text.secondary' }} gutterBottom>
					by {blog.author}
				</Typography>
				<Typography gutterBottom>
					<a href={blog.url} target="_blank" rel="noreferrer">
						{blog.url}
					</a>
				</Typography>
				<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18 }}>
					Added by {user.username}
				</Typography>
				<CardActions>
					<Typography sx={{ fontSize: 18 }}>likes {blog.likes}</Typography>
					{user && (
						<Button
							onClick={() => onUpdate(blog.id)}
							variant="outlined"
							sx={{ fontSize: 16, fontWeight: 600 }}
						>
							like
						</Button>
					)}
					{isCreator && (
						<Button
							sx={{ fontSize: 16, fontWeight: 600 }}
							variant="outlined"
							color="error"
							onClick={() => onRemove(blog.id)}
						>
							remove
						</Button>
					)}
				</CardActions>
			</CardContent>
		</Card>
	)
}

export default Blog
