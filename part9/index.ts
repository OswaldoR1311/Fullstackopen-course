import express from 'express'
import { multiply } from './multiplier.ts'

const app = express()



app.use(express.json())

app.post('/calculate', (req, res) => {
    const { value1, value2, message } = req.body

    const result = multiply(value1, value2, message)
    return res.send({ result })
})

app.get('/ping', (_req, res) => {
    res.send('pong')
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const x: any = 1



