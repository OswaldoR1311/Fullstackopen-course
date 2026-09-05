import { parse } from "node:path";

type Operation = "multiply" | "add" | "divide";
type Result = string | number;

// function calculator(a: number, b: number, op: Operation): Result {
// 	if (op === "multiply") {
// 		return a * b;
// 	} else if (op === "add") {
// 		return a + b;
// 	} else if (op === "divide") {
// 		if (b === 0) return "cant divide by 0";
// 		return a / b;
// 	}

// 	return "algo";
// }

// calculator(2, 5, "multiply");

// function calculator(a: number, b: number, op: Operation): Result {
// 	switch (op) {
// 		case "multiply":
// 			return a * b;
// 		case "add":
// 			return a + b;
// 		case "divide":
// 			if (b === 0) throw new Error("Cant divide by 0");
// 			return a / b;
// 		default:
// 			throw new Error("Operation is not multiply, add or divide");
// 	}
// }

// try {
// 	console.log(calculator(1, 5, "divide"));
// } catch (error: unknown) {
// 	let errorMessage = "Something went wrong";
// 	if (error instanceof Error) {
// 		errorMessage += error.message;
// 	}
// 	console.log(errorMessage);
// }

interface MultiplyValues {
	value1: number
	value2: number
}

function parseArguments(args: string[]): MultiplyValues {
	if (args.length < 4) throw new Error('Not enough arguments')
	if (args.length > 4) throw new Error('Too many arguments')
	
	if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			value1: Number(args[2]),
			value2: Number(args[3])
		}
	} else {
		throw new Error('Provided values are not numbers')
	}
} 

function multiply(a: number, b: number, printText: string) {
	console.log(printText, a * b)
}

// const a: number = Number(process.argv[2])
// const b: number = Number(process.argv[3])

try {
	const { value1, value2 } = parseArguments(process.argv)
	multiply(value1, value2, `Multiplied ${value1} and ${value2} and the resut is: `)
} catch (error: unknown) {
	let errorMsg = 'Something bad happened '
	if (error instanceof Error) {
		errorMsg += 'Error: ' + error.message
	}
	console.log(errorMsg);
	
}



