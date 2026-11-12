import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import EntryDetails from './EntryDetails'
import type { Diagnosis, Patient, Entry, NewEntry } from '../../types'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import { Transgender } from '@mui/icons-material'
import Button from '@mui/material/Button'
import type { Gender } from '../../types'
import EntryForm from './EntryForm'
import axios from 'axios'

interface PatientDetailProps {
  patients: Patient[]
  diagnosis: Diagnosis[]
}

const PatientDetail = ({ patients, diagnosis }: PatientDetailProps): React.JSX.Element => {
  const { id } = useParams()
  const findedPatient = patients.find(p => p.id === id)
  const [patient, setPatient] = useState<Patient | undefined>(findedPatient)
  const [showForm, setShowForm] = useState(false)

  console.log(patient)

  const handleGender = (value: Gender | undefined) => {
    let holder: string | React.JSX.Element = ''

    switch (value) {
      case 'male':
        holder = <MaleIcon />
        break
      case 'female':
        holder = <FemaleIcon />
        break
      case 'other':
        holder = <Transgender />
        break
      default:
        return ''
    }

    return holder
  }

  const genderValue = handleGender(patient?.gender)

  const submitNewEntry = async (values: NewEntry) => {
    if (!patient) return

    try {
      const { data: NuevaEntrada } = await axios.post<Entry>(`http://localhost:3001/api/patients/${patient.id}/entries`, values)
      setPatient({ ...patient, entries: patient?.entries.concat(NuevaEntrada) })
      hideForm()
    }
    catch (error) {
      console.log(error)
    }
  }

  const showEntryForm = () => setShowForm(true)
  const hideForm = () => setShowForm(false)

  return (
    <div>
      <Box>
        {patient && (
          <Typography variant="h5" gutterBottom>
            {patient.name}
            {' '}
            {genderValue}
            <Typography component="p">
              ssn:
              {' '}
              {patient.ssn}
            </Typography>
            <Typography component="p">
              occupation:
              {' '}
              {patient.occupation}
            </Typography>
            <Typography component="p">
              Date of birth:
              {patient?.dateOfBirth}
            </Typography>
          </Typography>
        )}
      </Box>

      {patient?.entries.length === 0
        ? null
        : (
            <Box>
              <Typography variant="h6">entries</Typography>
              {patient?.entries.map(entry => (
                <Typography component="div">
                  <EntryDetails entry={entry} />
                  <ul>
                    {entry.diagnosisCodes?.map((code, index) => {
                      const findedDiagnosis = diagnosis.find(d => d.code === code)
                      return (
                        <li key={index}>
                          {code}
                          {' '}
                          {findedDiagnosis?.name}
                        </li>
                      )
                    })}
                  </ul>
                </Typography>
              ))}
            </Box>
          )}
      <Box component="div" sx={{ marginBottom: '16px' }}>
        <Button onClick={showEntryForm} variant="contained">
          Add New Entry
        </Button>
      </Box>
      {showForm && <EntryForm onSubmit={submitNewEntry} onCancel={hideForm} diagnoses={diagnosis} />}
    </div>
  )
}

export default PatientDetail
