//Code for this exercise
interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface Msg {
	rate: number;
	description: string;
}

function parseArguments2(args: Array<string>) {
	if (args.length < 4) throw new Error("Missing arguments");

	args = process.argv.slice(2);
	const target = Number(args[0]);
	const dailyHours = args.slice(1).map(Number);

	const isValidHours = dailyHours.every((h) => !Number.isNaN(h));

	if (!Number.isNaN(target) && Array.isArray(dailyHours) && isValidHours) {
		return {
			target,
			dailyHours,
		};
	} else {
		throw new Error("Some of the information is not in a valid format");
	}
}

export function calculateExercises(dailyHours: Array<number>, target: number): Result {
	const periodLength = dailyHours.length;
	const trainingDays = [...dailyHours.filter((day) => day !== 0)].length;
	const average =
		dailyHours.reduce((acum: number, currEl: number) => acum + currEl, 0) /
		periodLength;
	const success = average > target;
	const percentage = (average / target) * 100;
	function getRating(percentage: number): Msg {
		switch (true) {
			case percentage >= 90:
				return {
					rate: 3,
					description: "Excelent, you have an outstanding rating",
				};
			case percentage >= 60:
				return { rate: 2, description: "Not too bad but could be better" };
			case percentage >= 30:
				return { rate: 1.5, description: "Bad, many things to improve" };
			default:
				return { rate: 1, description: "Very bad" };
		}
	}

	const { rate, description } = getRating(percentage);

	return {
		periodLength,
		trainingDays,
		average,
		success,
		rating: rate,
		ratingDescription: description,
		target,
	};
}

try {
	const { dailyHours, target } = parseArguments2(process.argv);
	console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
	// const errorMsg = "An error ocurr ";
	if (error instanceof Error) {
		console.log(`Error: ${error.message}`);
	}
}
