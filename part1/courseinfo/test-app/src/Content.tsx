import type { CourseP } from "./App"
import Part from "./Part"

interface ContentProps {
  courseParts: CourseP[]
}

const Content = ({courseParts}: ContentProps) => {

  return (
    <div>
     {courseParts.map(part => (
      <Part key={part.name} part={part} />
     ))}
    </div>
  )
}

export default Content