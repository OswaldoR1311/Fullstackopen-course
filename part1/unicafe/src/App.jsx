import { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = (value) => () => setGood(value + 1)
  const increaseNeutral = (value) => () => setNeutral(value + 1)
  const increaseBad = (value) => () => setBad(value + 1)
  return (
    <div>
      <h1>Hola mundo</h1>
      <Button onIncrement={increaseGood(good)} label={'good'} />
      <Button onIncrement={increaseNeutral(neutral)} label={'neutral'} />
      <Button onIncrement={increaseBad(bad)} label={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
