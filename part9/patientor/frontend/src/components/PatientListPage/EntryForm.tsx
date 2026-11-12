import { Typography, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material'
import { Box } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import type { HealthCheckRating, Diagnosis, NewEntry } from '../../types'

const ratingOptions = [
  { value: 0, label: 'Healthy' },
  { value: 1, label: 'Low Risk' },
  { value: 2, label: 'High Risk' },
  { value: 3, label: 'Critical Risk' },
]

interface Props {
  onSubmit: (entry: NewEntry) => void
  onCancel: () => void
  diagnoses: Diagnosis[]
}

type EntryType = 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'

const EntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [hcr, setHcr] = useState<HealthCheckRating>(0)
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([])
  const [entryType, setEntryType] = useState<EntryType>('HealthCheck')
  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState('')
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')

  const addEntryPatient = (event: SyntheticEvent) => {
    event.preventDefault()
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    }

    const assertNever = (value: never): never => {
      throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
    }

    switch (entryType) {
      case 'HealthCheck':
        onSubmit({
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating: hcr,
        })
        break
      case 'Hospital':
        onSubmit({
          ...baseEntry,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        })
        break
      case 'OccupationalHealthcare':
        onSubmit({
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          },
        })
        break
      default:
        return assertNever(entryType)
    }
  }

  return (
    <div>

      <Box component="form" sx={{ padding: '16px', borderWidth: '2px', borderStyle: 'dotted' }}>
        <Typography variant="h6" gutterBottom>New HealthCheck Entry</Typography>
        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <InputLabel id="entry"></InputLabel>
          <Select id="entry" label="Entry type" value={entryType} onChange={({ target }) => setEntryType(target.value)}>
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          </Select>
          <TextField required type="date" label="Date" value={date} onChange={({ target }) => setDate(target.value)} />
          <TextField required label="Description" value={description} onChange={({ target }) => setDescription(target.value)} />
          <TextField required label="Specialist" value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
          {/* <TextField required label='Health Check Rating (0-3)' value={hcr} /> */}

          {entryType === 'HealthCheck' && (
            <>
              <InputLabel id="hcr">Health Check Rating</InputLabel>
              <Select label="Health" id="hcr" value={hcr} onChange={({ target }) => setHcr(target.value)}>
                {ratingOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
          {entryType === 'Hospital' && (
            <>
              <TextField label="Discharge Date" value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)} />
              <TextField label="Discharge Criteria" value={dischargeCriteria} onChange={({ target }) => setDischargeCriteria(target.value)} />
            </>
          )}
          {entryType === 'OccupationalHealthcare' && (
            <>
              <TextField label="SickLeave Start" value={sickLeaveStart} onChange={({ target }) => setSickLeaveStart(target.value)} />
              <TextField label="SickLeave End" value={sickLeaveEnd} onChange={({ target }) => setSickLeaveEnd(target.value)} />
              <TextField label="Employer Name" value={employerName} onChange={({ target }) => setEmployerName(target.value)} />
            </>
          )}
          <InputLabel id="diagnoses-label">Diagnoses Codes</InputLabel>
          <Select
            labelId="diagnoses-label"
            multiple
            value={diagnosisCodes}
            onChange={({ target }) => {
              const value = target.value
              setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)
            }}
            renderValue={selected => selected.join(',')}
          >
            {diagnoses.map(d => (
              <MenuItem key={d.code} value={d.code}>
                <span>
                  {d.code}
                  {' '}
                  -
                  {' '}
                  {d.name}
                </span>
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box component="div" sx={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <Button onClick={addEntryPatient} variant="contained">Add</Button>
          <Button onClick={onCancel} variant="outlined">Cancel</Button>
        </Box>
      </Box>
    </div>
  )
}

export default EntryForm
