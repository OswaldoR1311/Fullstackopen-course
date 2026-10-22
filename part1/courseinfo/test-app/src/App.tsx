import './App.css'
import Header from './Header'
import Content from './Content'
import Total from './Total'

interface CourseBasis {
  name: string
  exerciseCount: number
}

interface Description extends CourseBasis {
  description: string
}

interface CoursePartBasic extends Description {
  // description: string
  kind: "basic"
}

interface CoursePartGroup extends CourseBasis {
  groupProjectCount: number
  kind: "group"
}

interface CoursePartBackground extends Description {
  // description: string
  backgroundMaterial: string
  kind: "background"
}

interface CoursePartBackend extends CourseBasis {
  description: string
  requirements: Array<string>
  kind: "special"
}

export type CourseP = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartBackend

const courseName = "Half Stack application development"

const courseParts: Array<CourseP> = [
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
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

const App = (): React.JSX.Element => {
  return (  
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
      <Total totalExercises={totalExercises}/>
    </div>
  )
}



export default App
