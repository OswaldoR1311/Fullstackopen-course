import type { sensitivePatientInfo, NewPatient, Patient, NewPatientEntry } from "../../types.ts";
import { patientsData } from "../../data/entries.ts";
import { v1 as uuid } from "uuid"; 

const getPatientSensitiveData = (): sensitivePatientInfo[] => {
    return patientsData.map(({id, gender, name, dateOfBirth, occupation, ssn, entries}) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries
    }));
};

const addPatientEntry = (data: NewPatient) => {
  const newPatient = {
    ...data
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addMedicalPatientEntry = (data: NewPatientEntry, patientId: string) => {
    const patient = patientsData.find(patient => patient.id === patientId);
   if(!patient) throw new Error('Patient does not exist');
   const newMedicalEntry = {
    id: uuid(),
    ...data
   };
   patient.entries.push(newMedicalEntry);
   return newMedicalEntry;
};

const getOnePatientInformation = (id: string): Patient | undefined => {
    console.log('me estoy ejecutando?');
    return patientsData.find(patient => patient.id === id);
};

export default { getPatientSensitiveData, addPatientEntry, getOnePatientInformation, addMedicalPatientEntry };