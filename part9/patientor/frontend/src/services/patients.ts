import axios from 'axios'
import { Patient, PatientFormValues, Diagnosis, NewEntry, Entry } from '../types'

import { apiBaseUrl } from '../constants'

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`,
  )

  return data
}

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`,
  )

  return data
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object,
  )

  return data
}

const createEntry = async (object: NewEntry, patientId: string) => {
  await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object,
  )
}

export default {
  getAll, create, getDiagnoses, createEntry,
}
