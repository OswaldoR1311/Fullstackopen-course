import { useApolloClient } from "@apollo/client/react";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
	const [page, setPage] = useState("authors");
	const [token, setToken] = useState(window.localStorage.getItem("user-token"));
	const [errorMsg, setErrorMsg] = useState(null);
	const client = useApolloClient();

	function notify(msg) {
		setErrorMsg(msg);
		setTimeout(() => {
			setErrorMsg(null);
		}, 5000);
	}

	function logout() {
		console.log("Estamos haciendo logout");
		setToken(null);
		window.localStorage.clear();
		client.resetStore();
	}

	return (
		<div>
			<div>
				<button type="button" onClick={() => setPage("authors")}>
					authors
				</button>
				<button type="button" onClick={() => setPage("books")}>
					books
				</button>
				{token && (
					<button type="button" onClick={() => setPage("add")}>
						add book
					</button>
				)}
				{!token ? (
					<button type="button" onClick={() => setPage("login")}>
						login
					</button>
				) : (
					<button type="button" onClick={logout}>
						logout
					</button>
				)}
			</div>

			<Authors show={page === "authors"} />

			<Books show={page === "books"} />

			<NewBook setPage={setPage} show={page === "add" && token} />

			<LoginForm
				setToken={setToken}
				setErrorMsg={notify}
				setPage={setPage}
				show={page === "login" && !token}
			/>

			{/* <Authors />
			<Books />
			<NewBook />
			<LoginForm setToken={setToken} setErrorMsg={notify} logout={logout} /> */}
		</div>
	);
};

export default App;
