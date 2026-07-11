import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
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
	const [notification, setNotification] = useState(null)
	const [blogs, setBlogs] = useState([])

	const blogRef = useRef()
	const navigate = useNavigate()

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
		<Togglable buttonLabel={'add new blog'} ref={blogRef}>
			<BlogForm createBlog={handleAddBlog} />
		</Togglable>
	)

	function handleNotification(message, severity) {
		setNotification({
			text: message,
			type: severity,
		})

		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			navigate('/')
		} catch {
			// setNotification(
			// 	'wrong username or password',
			// 	notificationStatusOptions.error,
			// )
			handleNotification('wrong username or password', 'error')
		}
	}

	const handleLogout = async () => {
		const confirmation = window.confirm('Are you sure to log out?')
		if (confirmation) {
			await window.localStorage.removeItem('loggedUser')
			setUser(null)
			setUsername('')
			setPassword('')
			navigate('/')
		} else {
			return null
		}
	}

	const handleAddBlog = async (blogObject) => {
		try {
			// blogRef.current.toggleVisibility()
			const returnedBlog = await blogService.createBlog(blogObject)
			const message = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
			handleNotification(message, 'success')
			setBlogs(blogs.concat(returnedBlog))
			navigate('/')
		} catch {
			handleNotification('blog not added', 'error')
		}
	}

	const handleUpdate = async (id) => {
		const blog = blogs.find((blog) => blog.id === id)
		const changedBlog = { ...blog, likes: blog.likes + 1 }

		try {
			const updatedBlog = await blogService.update(id, changedBlog)
			setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)))
		} catch {
			handleNotification('error handling like button', 'error')
		}
	}

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedUser')
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	useEffect(() => {
		if (user) {
			blogService.getAll(user.token).then((responseBlogs) => {
				setBlogs(responseBlogs)
			})
		}
	}, [user])

	async function removeBlog(id) {
		const findBlog = blogs.find((blog) => blog.id === id)
		if (!findBlog) {
			handleNotification('the blog does not exist', 'error')
		}
		try {
			const answer = window.confirm(
				`Remove blog ${findBlog.title} by ${findBlog.author}`,
			)
			if (answer) {
				await blogService.removeBlog(id)
				setBlogs(blogs.filter((blog) => blog.id !== id))
				handleNotification('Blog deleted succesfully', 'success')
				navigate('/')
			}
		} catch {
			handleNotification('an error ocurrs', 'error')
		}
	}

	const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes)

	const style = { '&:hover': { bgcolor: 'rgba(255, 255, 255, .3)' } }

	return (
		<Container>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component={'div'} sx={{ flexGrow: 1 }}>
						Blog App
					</Typography>
					<Button color="inherit" component={Link} to="/" sx={style}>
						Home
					</Button>
					<Button component={Link} to="/create" color="inherit" sx={style}>
						new blog
					</Button>
					{user ? (
						<Button
							component={Link}
							onClick={handleLogout}
							color="inherit"
							sx={style}
						>
							log out
						</Button>
					) : (
						<Button component={Link} to="/login" color="inherit">
							login
						</Button>
					)}
				</Toolbar>
			</AppBar>

			<Notification notification={notification} />
			<Routes>
				<Route
					path="/create"
					element={<BlogForm createBlog={handleAddBlog} />}
				/>
				<Route
					path="/login"
					element={
						<LoginForm
							handleLogin={handleLogin}
							setUsername={setUsername}
							setPassword={setPassword}
							username={username}
							password={password}
						/>
					}
				/>
				<Route
					path="/"
					element={
						<BlogList
							blogs={sortedBlogsByLikes}
							onUpdate={handleUpdate}
							onRemove={removeBlog}
						/>
					}
				/>
				<Route
					path="/blogs/:id"
					element={
						<Blog
							blogs={blogs}
							onUpdate={handleUpdate}
							onRemove={removeBlog}
							user={user}
						/>
					}
				/>
			</Routes>
			<Footer />
		</Container>
	)
}

export default App
