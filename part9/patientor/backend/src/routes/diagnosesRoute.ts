import express from 'express';
import type { Request, Response } from 'express';
import type { Diagnosis } from '../../types.ts';
import { diagnosesData } from '../../data/entries.ts'; 

const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req: Request, res: Response<Diagnosis[]>) => {
    return res.send(diagnosesData);
});

export default diagnoseRouter;