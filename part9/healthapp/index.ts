import express from "express";
import { calculateBMI } from "./bmiCalculator.ts";

const app = express();

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);
	const bmi = calculateBMI(height, weight);

	if (!height || !weight || Number.isNaN(height) || Number.isNaN(weight)) {
		return res.status(400).json({ error: "malformatted parameters" });
	}

	return res.json({
		weight,
		height,
		bmi,
	});
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
