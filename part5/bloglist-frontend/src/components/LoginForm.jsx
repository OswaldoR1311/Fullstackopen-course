import { Button, TextField } from '@mui/material'

const LoginForm = ({
	handleLogin,
	setUsername,
	setPassword,
	username,
	password,
}) => {
	return (
		<div>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					<TextField
						label="username"
						variant="standard"
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<TextField
						variant="standard"
						label="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<Button
					onClick={handleLogin}
					variant="contained"
					size="small"
					sx={{ marginTop: 2.5 }}
				>
					login
				</Button>
			</form>
		</div>
	)
}

export default LoginForm
