import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../mutations";

function LoginForm({ setToken, setErrorMsg }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [login] = useMutation(LOGIN, {
		onCompleted: ({ login }) => {
			const token = login.value;
			setToken(token);
			window.localStorage.setItem("user-token", token);
		},
		onError: (error) => setErrorMsg(error.message),
	});

	function submit(event) {
		event.preventDefault();
		login({ variables: { username, password } });
	}

	return (
		<div>
			<form onSubmit={submit}>
				<label>
					username
					<input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</label>
				<label>
					password
					<input
						type="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</label>
				<button type="submit">login</button>
			</form>
		</div>
	);
}

export default LoginForm;
