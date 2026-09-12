import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
	const [filter, setFilter] = useState("all genres");
	const { data, loading, error } = useQuery(ALL_BOOKS);

	if (!show) {
		return null;
	}

	if (loading) {
		return <p>Loading books...</p>;
	}

	const genres = new Set(
		data.allBooks
			.flatMap((book) => book.genres)
			.flatMap((genre) => genre.split(","))
			.map((genre) => genre.trim()),
	);
	const genreList = [...genres];

	const filteredBookList =
		filter === "all genres"
			? data.allBooks
			: data.allBooks.filter((book) => book.genres.includes(filter));

	function setGenreCategory(genre) {
		setFilter(genre);
	}

	return (
		<div>
			<h2>books</h2>
			<p>
				in genre{" "}
				<strong>
					<em>{filter}</em>
				</strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filteredBookList.map((a) => (
						<tr key={a.author.id}>
							<td>{a.title}</td>
							<td>{a.author?.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div style={{ marginTop: 20, display: "flex", gap: 4 }}>
				{genreList.map((genre) => (
					<button
						onClick={() => setGenreCategory(genre)}
						style={{ cursor: "pointer" }}
						type="button"
						key={genre}
					>
						{genre}
					</button>
				))}
				<button
					onClick={() => setGenreCategory("all genres")}
					style={{ cursor: "pointer" }}
					type="button"
				>
					all genres
				</button>
			</div>
		</div>
	);
};

export default Books;
