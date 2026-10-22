import type { ReactElement } from 'react'
import type { CourseP } from './App' 

interface PartProps {
  part: CourseP
}

/** Helper function for exhaustive type checking */
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}
 
const Part = ({part}: PartProps): React.JSX.Element => {

  let specificDetails: ReactElement | string = ''

  switch(part.kind) {
    case "basic":
      specificDetails = <i>{part.description}</i>
      break
    case "group":
      specificDetails = <p>Project exercises {part.groupProjectCount}</p>
      break
    case "background":
      specificDetails = <div>
        {part.description}
        <br />
        submit to {part.backgroundMaterial}
      </div>
      break
    case "special":
      specificDetails = <p>Required skills {part.requirements.join(', ')}</p>
      break
    default:
      return assertNever(part)
  }

  return (
    <div>
      <p>{part.name} {part.exerciseCount}</p>
      {specificDetails}
    </div>
  )
}

export default Part