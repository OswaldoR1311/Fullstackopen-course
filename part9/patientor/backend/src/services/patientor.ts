import type { sensitivePatientInfo, NewPatient, Patient } from "../../types.ts";
import { patientsData } from "../../data/entries.ts";
import { v1 as uuid } from "uuid"; 

const getPatientSensitiveData = (): sensitivePatientInfo[] => {
    return patientsData.map(({id, gender, name, dateOfBirth, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatientEntry = (data: NewPatient) => {
  const newPatient = {
    id: uuid(),
    ...data
  };
  patientsData.push(newPatient);
  return newPatient;
};

const getOnePatientInformation = (id: string): Patient | undefined => {
    console.log('me estoy ejecutando?');
    return patientsData.find(patient => patient.id === id);
};

export default {getPatientSensitiveData, addPatientEntry, getOnePatientInformation};