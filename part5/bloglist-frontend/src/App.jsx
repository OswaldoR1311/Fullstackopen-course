import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
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

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('Se esta ejecutando ? ', { username, password })
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
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
			{user === null ? (
				formLogin()
			) : (
				<>
					<h2>Blogs</h2>
					<p>
						<strong>{user.name}</strong> Logged in
						<button type="button" onClick={handleLogout}>
							log out
						</button>
					</p>
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
