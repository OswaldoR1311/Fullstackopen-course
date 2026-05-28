const express = require('express')
require('dotenv').config()
const Person = require('./models/person')
const morgan = require('morgan')
const app = express()

const generateID = () => {
  return Math.floor(Math.random() * 1000000)
}

app.use(express.json())
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :status - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.status(200).json(persons)
  })
})

app.get('/info', (req, res) => {
  const date = new Date()
  const html = `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date.toString()}</p>
    `
  res.send(html)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const findPerson = persons.find((person) => person.id === id)
  if (findPerson) {
    return res.json(findPerson)
  } else {
    return res
      .status(400)
      .json({ error: 'Entry does not exist in the phonebook' })
  }
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Missing name or number' })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson.save().then((savedPerson) => {
    res.status(201).json(savedPerson)
  })
})

const unknownEndpoints = (request, response) => {
  response.status(404).send({ error: 'unknown Endpoint' })
}

app.use(unknownEndpoints)

const errorHandler = (error, request, response, next) => {
  console.log(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
