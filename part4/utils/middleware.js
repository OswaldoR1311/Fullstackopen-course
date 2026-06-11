const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const infoLogger = (request, response, next) => {
	console.log('Method: ', request.method)
	console.log('Path ', request.path)
	console.log('Body ', request.body)
	console.log('-----')

	next()
}

const errorHandler = (error, request, response, next) => {
	console.log(error.name)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	} else if (
		error.name === 'MongoServerError' &&
		error.message.includes('E11000 duplicate key error')
	) {
		return response
			.status(400)
			.send({ error: 'expected `username` to be unique' })
	} else if (error.name === 'JsonWebToken') {
		return response.status(401).json({ error: 'token invalid' })
	}
	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	// if (authorization && authorization.startsWith('Bearer ')) {
	// 	request.token = authorization.replace('Bearer ', '')
	// } else {
	// 	request.token = null
	// }

	//Improving security
	if (authorization && authorization.toLowerCase().startsWith('Bearer ')) {
		request.token = authorization.substring(7)
	} else {
		request.token = null
	}
	next()
}

module.exports = { errorHandler, infoLogger, unknownEndpoint, tokenExtractor }
