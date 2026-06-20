import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notificationStatusOptions } from './constants'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationStatus, setNotificationStatus] = useState(null)
	const [blogs, setBlogs] = useState([])

	const formLogin = () => (
		<Togglable buttonLabel={'login'}>
			<LoginForm
				handleLogin={handleLogin}
				setUsername={setUsername}
				setPassword={setPassword}
				username={username}
				password={password}
			/>
		</Togglable>
	)

	const blogForm = () => (
		<Togglable buttonLabel={'cancel'}>
			<BlogForm />
		</Togglable>
	)

	const setNotification = (message, status) => {
		setNotificationMessage(message)
		setNotificationStatus(status)

		setTimeout(() => {
			setNotificationMessage(null)
			setNotificationStatus(null)
		}, 5000)
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
			setNotification(
				'wrong username or password',
				notificationStatusOptions.error,
			)
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
			setNotification('blog not added', notificationStatusOptions.error)
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
