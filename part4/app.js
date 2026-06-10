const express = require('express')
const mongoose = require('mongoose')
const { infoLog, errorLog } = require('./utils/logger')
const { MONGODB_URI } = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const {
	errorHandler,
	infoLogger,
	unknownEndpoint,
} = require('./utils/middleware')

const app = express()

infoLog('connecting to MongoDB ', MONGODB_URI)
mongoose
	.connect(MONGODB_URI)
	.then(() => infoLog('connected to MongoDB'))
	.catch((error) => errorLog('unable to connect MongoDB ', error.message))

app.use(express.json())
app.use(infoLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
