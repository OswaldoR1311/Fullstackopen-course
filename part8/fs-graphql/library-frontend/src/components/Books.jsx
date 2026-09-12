import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
	if (!show) {
		return null;
	}
	const { data, loading, error } = useQuery(ALL_BOOKS);

	if (loading) {
		return <p>Loading books...</p>;
	}

	// const books = [
	// 	{
	// 		title: "Hola mundo",
	// 		author: "Oswaldo Rodríguez",
	// 		published: 1992,
	// 	},
	// ];

	return (
		<div>
			<h2>books</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{data?.allBooks.map((a) => (
						<tr key={a.author.id}>
							<td>{a.title}</td>
							<td>{a.author?.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Books;
