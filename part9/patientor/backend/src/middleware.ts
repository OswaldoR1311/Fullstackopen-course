import type {Request, Response, NextFunction} from 'express';
import { PatientSchema } from '../types.ts';
import {z} from 'zod';


const parseReqBody = (req: Request, _res: Response, next: NextFunction) => {
  try {
    PatientSchema.parse(req.body);
    next();
  } catch(error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if(error instanceof z.ZodError) {
    res.status(400).send({error: error.issues});
  } else {
    next(error);  
  }
};

export {parseReqBody, errorMiddleware};
