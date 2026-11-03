import { z } from 'zod';

export interface Diagnosis {
  code: string
  name: string
  latin?: string
};

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  // diagnosisCode?: Diagnosis['code'][]
  diagnosisCodes?: Array<Diagnosis['code']>
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge?: {
    date: string
    criteria: string
  }
}
 
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

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