import { useState, useRef } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')

  const inputRef = useRef(null)

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, phone: phone }
    const findPerson = persons.find((person) => person.name === newPerson.name)

    if (!findPerson) {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setPhone('')
      inputRef.current.focus()
    } else {
      alert(`${newPerson.name} is already added to the phonebook`)
      setNewName('')
      setPhone('')
    }
  }

  const handleInputChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setPhone(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const filterPersonsByName = persons.filter((person) =>
    person.name.includes(filter),
  )
  const filteredList = filter ? filterPersonsByName : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
      <form onSubmit={handleAddPerson}>
        <h2>add a new</h2>
        <div>
          name:{' '}
          <input ref={inputRef} value={newName} onChange={handleInputChange} />
        </div>
        <div>
          number: <input value={phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredList.map((person, index) => (
          <li key={index}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
