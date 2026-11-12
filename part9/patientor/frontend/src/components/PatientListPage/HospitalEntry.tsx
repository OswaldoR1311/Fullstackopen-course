import BaseEntry from './Entry'
import type { HospitalEntry } from '../../types'
import { Typography } from '@mui/material'

interface HospitalEntryProps {
  entry: HospitalEntry
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
  return (
    <>
      <BaseEntry>
        <Typography variant="h5">
          {entry.date}
          {' '}
          Hospital
        </Typography>
        <Typography>{entry.description}</Typography>
        <Typography>
          Discharge:
          {entry.discharge?.date}
        </Typography>
        <Typography>
          Criteria:
          {entry.discharge?.criteria}
        </Typography>
        <Typography>
          Diagnosed by
          {' '}
          {entry.specialist}
        </Typography>
      </BaseEntry>
    </>
  )
}

export default HospitalEntry
