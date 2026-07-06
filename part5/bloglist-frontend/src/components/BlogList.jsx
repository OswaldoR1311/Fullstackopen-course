import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import Notification from './Notification'

function BlogList({ blogs, onUpdate, onRemove }) {
	// console.log(blogs)
	// const [user, setUser] = useState(null)
	// const [username, setUsername] = useState('')
	// const [password, setPassword] = useState('')
	//
	// async function handleUpdate(id) {
	// 	const blog = blogs.find((blog) => blog.id === id)
	// 	const changedBlog = { ...blog, likes: blog.likes + 1 }
	// 	try {
	// 		const updatedBlog = await blogService.update(id, changedBlog)
	// 		setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)))
	// 	} catch {
	// 		setNotification(
	// 			'error handling like button',
	// 			notificationStatusOptions.error,
	// 		)
	// 	}
	// }
	//
	// return (
	// 	<div>
	// 		<h1>Blogs</h1>
	// 		<Notification message={message} status={status} />
	// 		<ul>
	// 			{blogs.map((blog) => (
	// 				<Blog
	// 					key={blog.id}
	// 					blog={blog}
	// 					onUpdate={() => handleUpdate(blog.id)}
	// 					onRemove={() => removeBlog(blog.id)}
	// 				/>
	// 			))}
	// 		</ul>
	// 	</div>
	return (
		<div>
			<h1>Blogs</h1>
			{blogs.length === 0 ? (
				<div>You dont have blogs yet</div>
			) : (
				<ul>
					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							onUpdate={() => onUpdate(blog.id)}
							onRemove={() => onRemove(blog.id)}
						/>
					))}
				</ul>
			)}
		</div>
	)
}

export default BlogList
