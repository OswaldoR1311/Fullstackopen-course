import BaseEntry from './Entry'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import { Favorite } from '@mui/icons-material'
import type { HealthCheckEntry } from '../../types'

interface HealthCareEntryProps {
  entry: HealthCheckEntry

}

interface Color {
  color: string
}

const HealthCareEntry = ({ entry }: HealthCareEntryProps) => {
  let color: Color | string = ''
  if (entry.healthCheckRating === 0) {
    color = { color: 'green' }
  }
  else if (entry.healthCheckRating === 1) {
    color = { color: 'yellow' }
  }

  return (
    <div>
      {entry && (
        <BaseEntry>
          <Box>
            <Typography>
              {entry.date}
              {' '}
              <MedicalInformationIcon />
              <br />
              <i>{entry.description}</i>
              <br />
              <Favorite sx={color} />
              <br />
              diagnose by
              {' '}
              {entry.specialist}
            </Typography>
          </Box>
        </BaseEntry>
      )}
    </div>
  )
}

export default HealthCareEntry
