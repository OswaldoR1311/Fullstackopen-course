import { z } from 'zod';

export interface Diagnosis {
  code: string
  name: string
  latin?: string
};

//eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {

}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
};

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const PatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export type sensitivePatientInfo = Omit<Patient, 'ssn'>;
export type NewPatient = z.infer<typeof PatientSchema>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;