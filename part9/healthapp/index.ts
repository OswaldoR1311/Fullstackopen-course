import express, { type Request, type Response } from "express";
import { calculateBMI } from "./bmiCalculator.ts";
import { calculateExercises, Result } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

interface ExerciseInput {
    daily_exercises: unknown,
    target: unknown
}

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);


	if (!height || !weight || Number.isNaN(height) || Number.isNaN(weight)) {
		return res.status(400).json({ error: "malformatted parameters" });
	}

	const bmi = calculateBMI(height, weight);

	return res.status(200).json({
		weight,
		height,
		bmi,
	});
});


app.post("/exercises", (req: Request, res: Response) => {
	const { daily_exercises, target } = req.body as ExerciseInput;

	if (daily_exercises === undefined || target === undefined) return res.status(400).json({ error: 'parameters missing' });

	if (!Array.isArray(daily_exercises)) return res.status(400).json({ error: 'malformatted parameters' });

	const parsedExercises = daily_exercises.map(n => Number(n));
	const parsedTarget = Number(target);

	if (Number.isNaN(parsedTarget) || parsedExercises.some(n => Number.isNaN(n))) return res.status(400).json({ error: 'malformatted parameters' });

	const result: Result = calculateExercises(parsedExercises, parsedTarget);

	return res.status(200).json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

