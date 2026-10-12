import type { NewPatient } from "../types.ts";
import { Gender } from "../types.ts";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!isString(gender) || !isGender(gender)) throw new Error(`Incorrect or missing gender: ${gender} gender is not admited.`);
  return gender;
};

const parse = (name: unknown): string => {
  if(!name || !isString(name)) throw new Error('Incorrect or missing name');
  return name;
};



const parsePatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    
    const newEntryPatient: NewPatient = {
      name: parse(object.name),
      dateOfBirth: parse(object.dateOfBirth),
      ssn: parse(object.ssn),
      gender: parseGender(object.gender),
      occupation: parse(object.occupation)
    };

    return newEntryPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parsePatientEntry;