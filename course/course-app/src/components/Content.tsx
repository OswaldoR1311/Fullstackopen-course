import type { CoursePart } from "../App"

interface ContentProps {
  courseParts: CoursePart[]
}


const Content = ({courseParts}: ContentProps) => {

  courseParts.forEach(part => {
    switch (part.kind) {
      case "basic":
        console.log(part.name, part.description, part.exerciseCount)
        break
      case "group":
        console.log(part.name, part.exerciseCount, part.groupProjectCount)
        break 
      case "background":
        console.log(part.name, part.exerciseCount, part.backgroundMaterial)
        break
      default:
        break
    }
  })

  return (
    <div>
      {/* {
        courseParts.map(c => (
          <p key={c.name}>{c.name} {c.exerciseCount}</p>
        ))
      } */}
      <p>Hola mundo</p>
    </div>
  )
}

export default Content