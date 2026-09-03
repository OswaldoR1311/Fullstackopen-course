import mongoose from "mongoose";

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	favoriteGenre: {
		type: String,
	},
});

const User = mongoose.model("User", schema);
export default User;
