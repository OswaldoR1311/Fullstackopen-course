import { useState } from 'react'

const Blog = ({ blog, onUpdate, onRemove }) => {
	const [visible, setVisible] = useState(false)

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
							onClick={onUpdate}
						>
							like
						</button>
					</div>
					<button className="remove" type="button" onClick={onRemove}>
						remove
					</button>
				</div>
			)}
		</div>
	)
}

export default Blog
