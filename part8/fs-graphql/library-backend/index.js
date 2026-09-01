import { configDotenv } from "dotenv";
import connectToDB from "./db.js";
import startServer from "./server.js";

configDotenv();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

console.log({ MONGODB_URI, PORT });

async function main() {
	await connectToDB(MONGODB_URI); //Conectamos primero a la bd
	startServer(PORT); //Luego iniciamos el server apollo/node
}

main();
