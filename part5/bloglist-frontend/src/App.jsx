import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import { notificationStatusOptions } from './constants'
import blogService from './services/blogs'
import loginService from './services/login'
import setError from './utils/helperFunctions'

const App = () => {
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationStatus, setNotificationStatus] = useState(null)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [likes, setLikes] = useState(0)
	const [blogs, setBlogs] = useState([])

	const formLogin = () => (
		<div>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>
						username
						<input
							type="text"
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						password
						<input
							type="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
					</label>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)

	const blogForm = () => (
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

	const setNotification = (message, status) => {
		setNotificationMessage(message)
		setNotificationStatus(status)

		setTimeout(() => {
			setNotificationMessage(null)
			setNotificationStatus(null)
		}, 5000)
	}

	const cleanInputs = () => {
		setUsername('')
		setPassword('')
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			cleanInputs()
		} catch {
			setError('wrong username or password', notificationStatusOptions.error)
		}
	}

	const handleLogout = async () => {
		const confirmation = window.confirm('Are you sure to log out?')
		if (confirmation) {
			await window.localStorage.removeItem('loggedUser')
			setUser(null)
		} else {
			return null
		}
	}

	const handleAddBlog = async (event) => {
		event.preventDefault()
		const newBlog = {
			title,
			author,
			url,
			likes: 0,
		}

		try {
			const returnedBlog = await blogService.createBlog(newBlog)
			const message = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
			setNotification(message, notificationStatusOptions.success)
			setBlogs(blogs.concat(returnedBlog))
			cleanInputs()
		} catch {
			setError('blog not added', notificationStatusOptions.error)
		}
	}

	useEffect(() => {
		blogService.getAll().then((responseBlogs) => {
			setBlogs(responseBlogs)
		})
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedUser')
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	return (
		<div>
			<h2>Blogs</h2>
			<Notification message={notificationMessage} status={notificationStatus} />
			{!user && formLogin()}
			{user && (
				<>
					<p>
						<strong>{user.name}</strong> Logged in
						<button type="button" onClick={handleLogout}>
							log out
						</button>
					</p>
					<br />
					{blogForm()}
					<br />
					{blogs.map((b) => (
						<Blog key={b.id} blog={b} />
					))}
				</>
			)}
			<Footer />
		</div>
	)
}

export default App
