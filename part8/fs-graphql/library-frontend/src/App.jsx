import { useApolloClient } from "@apollo/client/react";
import { useState } from "react";
import Authors from "./components/Authors";
import BirthForm from "./components/BirthForm";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";

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

	const cursorStyle = { cursor: "pointer" };

	return (
		<div>
			<div>
				<button
					style={cursorStyle}
					type="button"
					onClick={() => setPage("authors")}
				>
					authors
				</button>
				<button
					style={cursorStyle}
					type="button"
					onClick={() => setPage("books")}
				>
					books
				</button>
				{token && (
					<button
						style={cursorStyle}
						type="button"
						onClick={() => setPage("add")}
					>
						add book
					</button>
				)}
				{token && (
					<button
						style={cursorStyle}
						type="button"
						onClick={() => setPage("recommended")}
					>
						recommend
					</button>
				)}
				{!token ? (
					<button
						style={cursorStyle}
						type="button"
						onClick={() => setPage("login")}
					>
						login
					</button>
				) : (
					<button style={cursorStyle} type="button" onClick={logout}>
						logout
					</button>
				)}
			</div>

			<Authors token={token} show={page === "authors"} />

			<Books show={page === "books"} />

			<NewBook setPage={setPage} show={page === "add" && token} />

			<Recommendations show={page === "recommended" && token} />

			<LoginForm
				setToken={setToken}
				setErrorMsg={notify}
				setPage={setPage}
				show={page === "login" && !token}
			/>
		</div>
	);
};

export default App;
