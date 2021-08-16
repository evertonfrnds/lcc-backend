import "reflect-metadata";

import express from "express";
import cors from "cors";

import "@shared/infra/typeorm";
import "@shared/container";
import routes from "../routes";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import schemaApollo from "../graphql";

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors())

  app.use(routes);

  const schema = await buildSchema({
    resolvers: schemaApollo.resolvers,
    dateScalarMode: "isoDate"
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => {
    app.listen(3333, () => {
      console.log("Server is started in port 3333");
      resolve(undefined);
    });
  });

  return { server, app };
};

export default startServer;
