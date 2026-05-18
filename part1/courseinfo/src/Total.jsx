const Total = ({ parts }) => {
  const total = parts.reduce((acum, currentValue) => {
    return acum + currentValue.exercises
  }, 0)
  return <p>Number of exercises {total}</p>
}

export default Total
