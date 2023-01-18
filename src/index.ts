import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { PubSub } from "graphql-subscriptions";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import persons from "./db";
import Mutation from "./resolvers/mutation";
import Person from "./resolvers/person";
import Query from "./resolvers/query";
import Subscription from "./resolvers/subscription";
import typeDefs from "./schema";

export const pubsub = new PubSub();

(async () => {
  const app = express();
  const httpServer = createServer(app);

  const resolvers = { Query, Person, Mutation, Subscription };
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: { persons },
  });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen({ port: PORT }, () => {
    console.log(`Server is up!`);
  });
})();
