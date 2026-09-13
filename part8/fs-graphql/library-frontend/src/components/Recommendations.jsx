import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../queries";

function Recommendations({ show }) {
	const { data, loading } = useQuery(ME, {
		skip: !show,
	});

	const favoriteGenre = data?.me?.favoriteGenre;

	const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
		variables: { genre: favoriteGenre },
		skip: !show || !favoriteGenre,
	});

	if (!show) {
		return null;
	}

	if (loading || booksLoading) return <p>Loading recommendations...</p>;

	const books = booksData?.allBooks;

	return (
		<div>
			<h2>recommendations</h2>
			<p>
				Books in your favorite genre <strong>{favoriteGenre}</strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books?.map((book) => (
						<tr key={book.title}>
							<td>{book.title}</td>
							<td>{book.author.name}</td>
							<td>{book.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Recommendations;
