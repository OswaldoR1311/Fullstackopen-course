const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('You have to pass a password')
  process.exit(1)
}

const password = process.argv[2]

const newPerson = new Person({ name: 'Oswaldo', number: '123456789' })

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  newPerson.save().then((result) => {
    console.log(
      `added ${newPerson.name} number ${newPerson.number} to phonebook`,
    )
    mongoose.connection.close()
  })
}
