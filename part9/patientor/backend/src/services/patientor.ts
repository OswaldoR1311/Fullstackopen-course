import type { sensitivePatientInfo, NewPatient } from "../../types.ts";
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

const addPatientEntry = (data: NewPatient ) => {
  const newPatient = {
    id: uuid(),
    ...data
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {getPatientSensitiveData, addPatientEntry};