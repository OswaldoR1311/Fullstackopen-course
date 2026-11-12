import type { Entry } from '../../types'
import HealthCareEntry from './HealthCareEntry'
import HospitalEntry from './HospitalEntry'
import OccupationalEntry from './OccupationalEntry'

interface EntryProps {
  entry: Entry
}

const assertNever = (value: never): never => {
  throw new Error('Unhandled case')
}

const EntryDetails = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCareEntry entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalEntry entry={entry} />
    case 'Hospital':
      return <HospitalEntry entry={entry} />
    default:
      assertNever(entry)
  }
}

export default EntryDetails
