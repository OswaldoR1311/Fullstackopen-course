import { useParams } from 'react-router-dom'

const Blog = ({ blogs, onUpdate, onRemove, user }) => {
	const id = useParams().id
	const blog = blogs.find((b) => b.id === id)

	if (!blog) {
		return <p>Blog not founded...</p>
	}

	return (
		<div className="blog">
			<h2>
				{blog.title} {blog.author}
			</h2>

			<div>
				<a href={blog.url} target="_blank" rel="noreferrer">
					{blog.url}
				</a>

				<div style={{ display: 'flex', alignItems: 'center' }}>
					<p style={{ margin: 0 }}>likes {blog.likes}</p>

					{user && (
						<button type="button" onClick={() => onUpdate(blog.id)}>
							like
						</button>
					)}

					<div>
						{user && (
							<button type="button" onClick={() => onRemove(blog.id)}>
								remove
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Blog
