import mongoose from "mongoose";

async function connectToDB(uri) {
	console.log("Connecting to database URI: ", uri);
	try {
		await mongoose.connect(uri);
		console.log("connected to MongoDB");
	} catch (error) {
		console.log("error connection to MongoDB: ", error.message);
		process.exit(1);
	}
}

export default connectToDB;
