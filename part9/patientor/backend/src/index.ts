import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnosesRoute.ts';
import patientRouter from './routes/patientsRoute.ts';


const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
    res.send("Testing");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));