const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
const { infoLog, errorLog } = require('../utils/logger')
mongoose.set('strictQuery', false)

const url = MONGODB_URI

infoLog('Connecting to MongoDB')

mongoose
	.connect(url, { family: 4 })
	.then(() => infoLog('Connected to MongoDB'))
	.catch((error) => errorLog(error, error.message))

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.__v
		delete returnedObject._id
	},
})

module.exports = new mongoose.model('Blog', blogSchema)
