import express from 'express';
import type { Request, Response } from 'express';
import type { sensitivePatientInfo } from '../../types.ts';
import patientor from '../services/patientor.ts';
import parsePatientEntry from '../utils.ts';


const patientRouter = express.Router();

patientRouter.get("/", (_req: Request, res: Response<sensitivePatientInfo[]>) => {
    return res.send(patientor.getPatientSensitiveData());
});

patientRouter.post('/', (req: Request, res: Response) => {
  try {
    const newPatientEntry = parsePatientEntry(req.body);
    const addedPatientEntry = patientor.addPatientEntry(newPatientEntry);
    res.json(addedPatientEntry);
  } catch(error: unknown) {
    let errorMsg = 'Something went wrong ';
    if (error instanceof Error) {
      errorMsg += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMsg);
  }
});

export default patientRouter;