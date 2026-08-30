import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { EDIT_AUTHOR_BIRTH } from "../mutations";
import { ALL_AUTHORS } from "../queries";

function BirthForm() {
	const [name, setName] = useState("");
	const [born, setBorn] = useState("");

	const { data } = useQuery(ALL_AUTHORS);
	const [editAuthorFn] = useMutation(EDIT_AUTHOR_BIRTH);

	function submit(event) {
		event.preventDefault();

		editAuthorFn({
			refetchQueries: ["allBooks", "allAuthors"],
			variables: {
				name,
				setBornTo: parseInt(born),
			},
		});

		setName("");
		setBorn("");
	}

	return (
		<form onSubmit={submit}>
			<h2>Set birthyear</h2>
			<div>
				<label>
					name
					{/* <input
						type="text"
						value={name}
						onChange={({ target }) => setName(target.value)}
					/> */}
					<select onChange={({ target }) => setName(target.value)}>
						<option value={""} disabled>
							Select an author
						</option>
						{data?.allAuthors?.map((a) => (
							<option value={a.name} key={a.id}>
								{a.name}
							</option>
						))}
					</select>
				</label>
			</div>
			<div>
				<label>
					born
					<input
						type="text"
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</label>
			</div>
			<button type="submit">update author</button>
		</form>
	);
}

export default BirthForm;
