import express from 'express';
import type { Request, Response } from 'express';
import type { Patient, NewPatient, sensitivePatientInfo } from '../../types.ts';
import patientor from '../services/patientor.ts';
import { parseReqBody, errorMiddleware } from '../middleware.ts';

interface PatientParams {
  id: string
}

interface Error {
  error: string
}

const patientRouter = express.Router();

patientRouter.get("/", (_req: Request, res: Response<sensitivePatientInfo[]>) => {
    return res.send(patientor.getPatientSensitiveData());
});

// patientRouter.post('/', (req: Request, res: Response) => {
//   try {
//     const newPatientEntry = parsePatientEntry(req.body);
//     const addedPatientEntry = patientor.addPatientEntry(newPatientEntry);
//     res.json(addedPatientEntry);
//   } catch(error: unknown) {
//     let errorMsg = 'Something went wrong ';
//     if (error instanceof Error) {
//       errorMsg += ` Error: ${error.message}`;
//     }
//     res.status(400).send(errorMsg);
//   }
// });

patientRouter.get('/:id', (req: Request<PatientParams>, res: Response<Patient | Error>) => {
  const paramsID = req.params.id;
  const findedPatient = patientor.getOnePatientInformation(paramsID);
 if (findedPatient) {
  return res.json(findedPatient);
 } else {
  return res.status(404).json({error: 'Patient not found'});
 }
});

patientRouter.post('/', parseReqBody, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedEntry = patientor.addPatientEntry(req.body);
  res.json(addedEntry);
});



patientRouter.use(errorMiddleware);

export default patientRouter;