import express from 'express';
import type { Request, Response } from 'express';
import type { sensitivePatientInfo } from '../../types.ts';
import patientor from '../services/patientor.ts';


const patientRouter = express.Router();

patientRouter.get("/", (_req: Request, res: Response<sensitivePatientInfo[]>) => {
    return res.send(patientor.getPatientSensitiveData());
});

export default patientRouter;