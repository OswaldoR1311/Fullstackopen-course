import { useState, useEffect } from 'react'
import axios from 'axios'
import Heading from './Heading'
import Filter from './Filter'
import Form from './Form'
import PersonList from './PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')

  const baseUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    const promise = axios.get(baseUrl)
    const eventHandler = (response) => {
      const dataFromServer = response.data
      setPersons(dataFromServer)
    }
    promise.then(eventHandler)
  }, [])

  const filterPersonsByName = persons.filter((person) =>
    person.name.toLowerCase().includes(filter),
  )
  const filteredList = filter ? filterPersonsByName : persons

  const formValues = {
    persons,
    newName,
    phone,
    onNewName: setNewName,
    onPhone: setPhone,
    onPersons: setPersons,
  }

  return (
    <div>
      <Heading />
      <Filter filter={filter} onChangeFilter={setFilter} />
      <Form formValues={formValues} />
      <PersonList filteredList={filteredList} />
    </div>
  )
}

export default App
