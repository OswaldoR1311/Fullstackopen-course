import axios from 'axios'

const baseUrl = '/api/blogs'

let token

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAll = async (token) => {
	const loggedUserJSON = window.localStorage.getItem('loggedUser')

	let config

	if (loggedUserJSON) {
		const user = JSON.parse(loggedUserJSON)
		config = { headers: { Authorization: `Bearer ${token}` } }
	}

	const response = await axios.get(baseUrl, config)
	return response.data
}

const createBlog = async (newBlog) => {
	const config = { headers: { Authorization: token } }
	const request = await axios.post(baseUrl, newBlog, config)
	return request.data
}

const update = async (id, newBlog) => {
	const request = await axios.put(`${baseUrl}/${id}`, newBlog)
	return request.data
}

const removeBlog = async (id) => {
	const config = { headers: { Authorization: token } }
	await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, createBlog, update, removeBlog }
