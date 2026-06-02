const express = require('express')
const blogRouter = require('./controllers/blogs')
const { PORT } = require('./utils/config')

const app = express()
app.use(express.json())

app.use('/', blogRouter)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
