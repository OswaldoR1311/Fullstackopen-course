import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";
import BirthForm from "./BirthForm";

const Authors = () => {
	const { loading, error, data } = useQuery(ALL_AUTHORS);

	if (loading) {
		return <p>Loading authors...</p>;
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{data?.allAuthors?.map((a) => (
						<tr key={a.id}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<BirthForm />
		</div>
	);
};

export default Authors;
