import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import User from "./models/user.js";
import resolvers from "./resolvers.js";
import typeDefs from "./schema.js";

configDotenv();

async function getUserFromAuthHeader(auth) {
	if (!auth || !auth.startsWith("Bearer ")) return null;

	try {
		const token = auth.substring(7);
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		return await User.findById(decodedToken.id);
	} catch (error) {
		return null;
	}
}

function startServer(port) {
	const server = new ApolloServer({ typeDefs, resolvers });

	startStandaloneServer(server, {
		listen: { port: 4000 },
		context: async ({ req }) => {
			const currentUser = await getUserFromAuthHeader(
				req.headers.authorization,
			);
			return { currentUser };
		},
	}).then(({ url }) => {
		console.log(`Server ready at ${url}`);
	});
}

export default startServer;
