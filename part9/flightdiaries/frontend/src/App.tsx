import { useState, useEffect } from 'react'
import axios from 'axios'

interface Diary {
  id: number
  date: string
  weather: string
  visibility: string
}

interface ValidationError {
  code: string
  message: string
  path: string[]
  values: string[]
  pattern?: string
}

type NewDiary = Omit<Diary, 'id'>

const baseUrl = 'http://localhost:3000/api/diaries'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [newDate, setNewDate] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [notificationMsg, setNotificationMsg] = useState('')

  useEffect(() => {
    axios.get<Diary[]>(baseUrl).then(response =>
      setDiaries(response.data),
    )
  }, [])

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()
    axios.post(baseUrl, {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
    }).then((response) => {
      setDiaries(diaries.concat(response.data))
      setNewDate('')
      setNewVisibility('')
      setNewWeather('')
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data && Array.isArray(error.response.data.error)) {
          error.response.data.error.forEach((e: ValidationError) => {
            if (e.path.includes('weather')) {
              setNotificationMsg(`Error: invalid weather: ${newWeather}`)
            } else if (e.path.includes('visibility')) {
              setNotificationMsg(`Error: invalid visibility: ${newVisibility}`)
            } else if (e.path.includes('date')) {
              setNotificationMsg(`Error: invalid date: ${newDate}`)
            }
          })
          setTimeout(() => {
            setNotificationMsg('')
          }, 5000)
        }
      } else {
        console.error(error)
      }
    })
  }

  return (
    <div>
      <h2>Add new Diary</h2>
      {notificationMsg && <p style={{ color: 'red' }}>{notificationMsg}</p>}
      <form onSubmit={addDiary}>
        <label>
          Date:
          {' '}
          <input type="text" value={newDate} onChange={event => setNewDate(event.target.value)} />
        </label>
        <label>
          Weather:
          {' '}
          <input type="text" value={newWeather} onChange={event => setNewWeather(event.target.value)} />
        </label>
        <label>
          Visibility:
          {' '}
          <input type="text" value={newVisibility} onChange={event => setNewVisibility(event.target.value)} />
        </label>
        <button type="submit">add</button>
      </form>
      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            <p>
              Date:
              {' '}
              {' '}
              {diary.date}
            </p>
            <p>
              Weather:
              {' '}
              {' '}
              {diary.weather}
            </p>
            <p>
              Visibility:
              {' '}
              {' '}
              {diary.visibility}
            </p>
          </li>
        ),
        )}
      </ul>
    </div>
  )
}

export default App
