import { useState } from 'react'

const Blog = ({ blog, onUpdate }) => {
	const [visible, setVisible] = useState(false)

	return (
		<div className="blog">
			<div style={{ display: 'flex' }}>
				<h3>{blog.title}</h3>
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
							style={{ flexShrink: 0, alignSelf: 'center', marginLeft: 8 }}
							onClick={onUpdate}
						>
							like
						</button>
					</div>
					<p>{blog.author}</p>
				</div>
			)}
		</div>
	)
}

export default Blog
