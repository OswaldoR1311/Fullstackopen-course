import { useState } from 'react'
import Heading from './Heading'
import Filter from './Filter'
import Form from './Form'
import PersonList from './PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')

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
