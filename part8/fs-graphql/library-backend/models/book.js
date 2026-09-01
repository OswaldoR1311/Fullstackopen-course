import mongoose from "mongoose";

const schema = new mongoose.Schema({
	title: { type: String, required: true, minlength: 5, unique: true },
	published: { type: Number },
	author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
	genres: [{ type: String }],
});

const Book = mongoose.model("Book", schema);
export default Book;
