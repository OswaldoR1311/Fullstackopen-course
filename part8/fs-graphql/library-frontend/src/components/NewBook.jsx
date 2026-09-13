import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ADD_BOOK } from "../mutations";

const NewBook = ({ show, setPage }) => {
	if (!show) {
		return null;
	}

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

	const [mutationFn] = useMutation(ADD_BOOK);

	const submit = async (event) => {
		event.preventDefault();

		mutationFn({
			refetchQueries: ["allBooks", "allAuthors"],
			variables: {
				title,
				author,
				published: parseInt(published),
				genres,
			},
		});

		console.log("ejecutando");

		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
		setPage("books");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					<label>
						title
						<input
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						author
						<input
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						published
						<input
							type="number"
							value={published}
							onChange={({ target }) => setPublished(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						genre
						<input
							value={genre}
							onChange={({ target }) => setGenre(target.value)}
						/>
					</label>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
