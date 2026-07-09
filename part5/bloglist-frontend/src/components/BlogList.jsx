import { Link } from 'react-router-dom'

function BlogList({ blogs }) {
	return (
		<div>
			<h1>Blogs</h1>
			{blogs.length === 0 ? (
				<div>You dont have blogs yet</div>
			) : (
				<ul>
					{blogs.map((blog) => (
						<li key={blog.id}>
							<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default BlogList
