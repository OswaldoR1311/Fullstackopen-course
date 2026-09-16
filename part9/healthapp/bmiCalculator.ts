interface DataBody {
	weight: number;
	height: number;
}

if (process.argv[1] === import.meta.filename) {
	// do not run this code if module is imported
}

function parseArguments(args: Array<string>): DataBody {
	if (args.length < 4) throw new Error("Not enough arguments");
	if (args.length > 4) throw new Error("Too many arguments");

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			weight: Number(args[3]),
			height: Number(args[2]),
		};
	} else {
		throw new Error("Provided values are not numbers");
	}
}

export function calculateBMI(height: number, weight: number) {
	if (height <= 0 || weight <= 0) {
		throw new Error("Weight and height can´t be 0");
	}

	const heightInCms = height / 100;

	const bmiOperation = weight / (heightInCms * heightInCms);

	if (bmiOperation < 16) {
		return `Your BMI index is: ${bmiOperation.toFixed(2)} Underweight (Severe thinness)`;
	} else if (bmiOperation >= 16 && bmiOperation <= 17) {
		return `Your BMI index is: ${bmiOperation.toFixed(2)}  Underweight (Moderate thinness)`;
	} else if (bmiOperation >= 17 && bmiOperation <= 18.5) {
		return `Your BMI index is: ${bmiOperation.toFixed(2)}  Underweight (Mild thinness)`;
	} else if (bmiOperation >= 18.5 && bmiOperation <= 25) {
		return `Your BMI index is: ${bmiOperation.toFixed(2)}  Normal range `;
	} else if (bmiOperation >= 25 && bmiOperation <= 30) {
		return `Your BMI index is: ${bmiOperation.toFixed(2)}  Overweight (Pre-obese) `;
	} else {
		return "Obese";
	}
}

try {
	const { height, weight } = parseArguments(process.argv);
	calculateBMI(height, weight);
} catch (error: unknown) {
	let errorMsg = "An error ocurr";
	if (error instanceof Error) {
		errorMsg += `Error: ${error.message}`;
	}
	console.log(errorMsg);
}
