import { NowRequest, NowResponse } from "@now/node";
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../src/typeDefs";
import resolvers from "../src/resolvers";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NowRequest, res: NowResponse) => {
  const server = new ApolloServer({ typeDefs, resolvers });

  return server.createHandler({ path: "/api/graphql" })(req, res);
};
