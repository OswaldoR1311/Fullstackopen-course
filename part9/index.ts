import express, { Request, Response } from 'express'
import { multiply, type Result } from './multiplier.ts'

const app = express()

app.use(express.json())

app.post('/calculate', (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, message } = req.body

    const result = multiply(value1, value2, message as Result)
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

console.log('Hola mundo')



