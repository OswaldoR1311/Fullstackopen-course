import Topic from './Topic'

const Statistics = ({ good, neutral, bad }) => {
  const options = [
    {
      name: 'good',
      value: good,
    },
    {
      name: 'neutral',
      value: neutral,
    },
    {
      name: 'bad',
      value: bad,
    },
  ]
  return (
    <div>
      <h2>Statistics</h2>
      {options.map(({ name, value }) => (
        <Topic label={name} value={value} key={name} />
      ))}
    </div>
  )
}

export default Statistics
