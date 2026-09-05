import crypto from "crypto";
import { configDotenv } from "dotenv";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import Author from "./models/author.js";
import Book from "./models/book.js";
import User from "./models/user.js";

configDotenv();

function requireAuth(context) {
	if (!context.currentUser) {
		throw new GraphQLError("Authentication required", {
			extensions: {
				code: "UNAUTHENTICATED",
			},
		});
	}
}

const resolvers = {
	Query: {
		booksCount: async () => Book.collection.countDocuments(),
		authorsCount: async () => Author.collection.countDocuments(),
		// allBooks: (root, args) => {
		// 	return books.filter((book) => book.author === args.author);
		// }, //Primera modificación
		allBooks: async (root, args) => {
			const filter = {};
			if (args.author) {
				const author = await Author.findOne({ name: args.author });
				if (!author) {
					return [];
				}

				filter.author = author._id;
			}

			if (args.genre) {
				filter.genres = args.genre;
			}

			const books = await Book.find(filter).populate("author");

			return books;
		},
		allAuthors: async () => Author.find({}),
		me: (root, args, context) => {
			console.log("Me estoy ejecutando");
			console.log(args);
			console.log(context);
			return context.currentUser;
		},
	},

	Author: {
		bookCount: async (parent) => {
			return Book.countDocuments({ author: parent._id });
		},
	},

	Mutation: {
		addBook: async (root, args, context) => {
			requireAuth(context);
			let author = await Author.findOne({ name: args.author });

			if (!author) {
				author = new Author({ name: args.author });
				try {
					await author.save();
				} catch (error) {
					throw new GraphQLError("Error saving author", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.author,
							error,
						},
					});
				}
			}

			const book = new Book({ ...args, author: author._id });
			try {
				await book.save();
			} catch (error) {
				throw new GraphQLError("Error saving book", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.title,
						error,
					},
				});
			}

			return book.populate("author");
		},
		editAuthor: async (root, args, context) => {
			requireAuth(context);
			const findAuthor = await Author.findOne({ name: args.name });
			if (!findAuthor) {
				// throw new GraphQLError(`Author ${args.name} not finded`, {
				// 	extensions: {
				// 		code: "BAD_USER_INPUT",
				// 		argumentName: "name",
				// 	},
				// });
				return null;
			}
			findAuthor.born = args.setBornTo;
			return findAuthor.save();
		},

		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});
			return user.save().catch((error) => {
				throw new GraphQLError(`Creating the user failed: ${error.message}`, {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.username,
						error,
					},
				});
			});
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw new GraphQLError(`wrong credentials`, {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},

		_resetDatabase: async () => {
			if (process.env.NODE_ENV !== "test") {
				throw new GraphQLError("_resetDatabase is only avaliable in test mode");
			}

			await Author.deleteMany({});
			await Book.deleteMany({});
			await User.deleteMany({});

			return true;
		},
	},
};

export default resolvers;
