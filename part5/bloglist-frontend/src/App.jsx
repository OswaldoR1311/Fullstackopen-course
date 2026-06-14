import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		blogService.getAll().then((responseBlogs) => {
			setBlogs(responseBlogs);
		});
	}, []);

	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map((b) => (
				<Blog key={b.id} blog={b} />
			))}
		</div>
	);
};

export default App;
