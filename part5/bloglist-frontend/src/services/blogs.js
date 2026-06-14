import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = () => {
	const response = axios.get(baseUrl);
	return response.data;
};

export default { getAll };
