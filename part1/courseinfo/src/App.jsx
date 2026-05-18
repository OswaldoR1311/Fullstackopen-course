import Course from './Course'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },

      {
        name: 'Using props to pass data',
        exercises: 7,
      },

      {
        name: 'State of a Component',
        exercises: 14,
      },

      {
        name: 'Complex state Redux',
        exercises: 11,
      },
    ],
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
