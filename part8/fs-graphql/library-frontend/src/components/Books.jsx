import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
	const [filter, setFilter] = useState(null);
	const { data, loading } = useQuery(ALL_BOOKS, {
		variables: { genre: filter },
	});

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

	return (
		<div>
			<h2>books</h2>
			<p>
				in genre{" "}
				<strong>
					<em>{filter ?? "all genres"}</em>
				</strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th>title</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{data.allBooks?.map((a) => (
						<tr key={a.title}>
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
						onClick={() => setFilter(genre)}
						style={{ cursor: "pointer" }}
						type="button"
						key={genre}
					>
						{genre}
					</button>
				))}
				<button
					onClick={() => setFilter(null)}
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
