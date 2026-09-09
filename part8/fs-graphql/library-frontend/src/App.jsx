import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
	// const [page, setPage] = useState("authors");
	const [token, setToken] = useState(window.localStorage.getItem("user-token"));
	const [errorMsg, setErrorMsg] = useState(null);

	function notify(msg) {
		setErrorMsg(msg);
		setTimeout(() => {
			setErrorMsg(null);
		}, 5000);
	}

	return (
		<div>
			{/* <div>
				<button type="button" onClick={() => setPage("authors")}>
					authors
				</button>
				<button type="button" onClick={() => setPage("books")}>
					books
				</button>
				<button type="button" onClick={() => setPage("add")}>
					add book
				</button>
				<button type="button" onClick={() => setPage("login")}>
					login
				</button>
			</div>

			<Authors show={page === "authors"} />

			<Books show={page === "books"} />

			<NewBook show={page === "add"} />

			<LoginForm show={page === "login"} /> */}
			<Authors />
			<Books />
			<NewBook />
			<LoginForm setToken={setToken} setErrorMsg={notify} />
		</div>
	);
};

export default App;
