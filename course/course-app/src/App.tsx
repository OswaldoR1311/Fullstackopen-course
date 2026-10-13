import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"

interface Course {
  name: string
  exerciseCount: number
}

interface CoursePartBasic extends Course {
  description: string
  kind: "basic"
}

interface CoursePartGroup extends Course {
  groupProjectCount: number
  kind: "group"
}

interface CoursePartBackground extends Course {
  backgroundMaterial: string
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      description: "Confusing description",
      kind: "background"
    }
  ]

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  // return (
  //   <div>
  //     <h1>{courseName}</h1>
  //     <p>
  //       {courseParts[0].name} {courseParts[0].exerciseCount}
  //     </p>
  //     <p>
  //       {courseParts[1].name} {courseParts[1].exerciseCount}
  //     </p>
  //     <p>
  //       {courseParts[2].name} {courseParts[2].exerciseCount}
  //     </p>
  //     <p>Number of exercises {totalExercises}</p>
  //   </div>
  // )

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total total={totalExercises}/>
    </div>
  )
}

export default App