import { useState } from 'react'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs, onUpdate, onRemove }) => {
	const [visible, setVisible] = useState(false)

	const id = useParams().id
	const blog = blogs.find((blog) => blog.id === id)
	return (
		<div className="blog">
			<div style={{ display: 'flex' }}>
				<h3>
					{blog.title} {blog.author}
				</h3>
				<button
					style={{ flexShrink: 0, alignSelf: 'center', marginLeft: 8 }}
					type="button"
					onClick={() => setVisible(!visible)}
				>
					{visible ? 'hide' : 'view'}
				</button>
			</div>
			{visible && (
				<div>
					<p>{blog.url}</p>
					<div style={{ display: 'flex' }}>
						<p>likes {blog.likes}</p>
						<button
							type="button"
							className="like"
							style={{ flexShrink: 0, alignSelf: 'center', marginLeft: 8 }}
							onClick={() => onUpdate(blog.id)}
						>
							like
						</button>
					</div>
					<button
						className="remove"
						type="button"
						onClick={() => onRemove(blog.id)}
					>
						remove
					</button>
				</div>
			)}
		</div>
	)
}

export default Blog
