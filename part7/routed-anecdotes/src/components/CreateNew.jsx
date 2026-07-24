import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addAnecdote }) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const navigate = useNavigate()


  const { value: contentValue, onChange: contentChange} = useField('text')
  const { value: authorValue, onChange: authorChange} = useField('text')
  const { value: infoValue, onChange: infoChange} = useField('text')

  function handleSubmit(event) {
    event.preventDefault()
    addAnecdote({contentValue, authorValue, infoValue, votes: 0})
    console.log({ contentValue, authorValue, infoValue})
    navigate('/')
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={contentValue} onChange={contentChange} />
        </div>
        <div>
          author
          <input name='author' value={authorValue} onChange={authorChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={infoValue} onChange={infoChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew
