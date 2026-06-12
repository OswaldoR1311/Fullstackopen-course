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
	title: {
		type: String,
		required: true,
	},
	author: String,
	url: {
		type: String,
		required: true,
	},
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.__v
		delete returnedObject._id
	},
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
