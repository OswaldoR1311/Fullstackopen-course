import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((p) => (
        <Part key={p.name} name={p.name} exercises={p.exercises} />
      ))}
      <Total parts={parts} />
    </>
  )
}

export default Content
