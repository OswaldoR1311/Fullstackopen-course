interface TotalProps {
  totalExercises: number
}

const Total = ({totalExercises}: TotalProps): React.JSX.Element => {
  return <p>Number of exercises {totalExercises}</p>
}

export default Total