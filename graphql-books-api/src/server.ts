import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@as-integrations/express4";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import express, { type Express } from "express";
import cors from "cors";

const app: Express = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  //   const { url } = await startStandaloneServer(server, {
  //     listen: { port: 4000 },
  //   });
  await server.start();
  app.use(cors());
  app.use(express.json());
  app.use("/graphql", expressMiddleware(server));
  app.get("/", (req, res) => res.json({ message: "Express endpoint working" }));
  app.listen(4000, () =>
    console.log(`Server running at http:localhost:4000/graphql`)
  );
};

startServer();
