import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addAnecdote }) => {
	// const [content, setContent] = useState('')
	// const [author, setAuthor] = useState('')
	// const [info, setInfo] = useState('')
	const navigate = useNavigate()

	const content = useField('text')
	const author = useField('text')
	const info = useField('text')

	function handleSubmit(event) {
		event.preventDefault()
		addAnecdote({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		})

		navigate('/')
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input
						type={content.type}
						name="content"
						value={content.value}
						onChange={content.onChange}
					/>
				</div>
				<div>
					author
					<input
						type={author.type}
						name="author"
						value={author.value}
						onChange={author.onChange}
					/>
				</div>
				<div>
					url for more info
					<input
						type={info.type}
						name="info"
						value={info.value}
						onChange={info.onChange}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default CreateNew
