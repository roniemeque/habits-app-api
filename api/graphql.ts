import { NowRequest, NowResponse } from "@now/node";
import { send } from "micro";
import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../src/typeDefs";
import resolvers from "../src/resolvers";
import getCollection from "../src/lib/database";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  origin:
    process.env.NODE_ENV === "production" ? "https://habits.ronie.dev" : "*",
});

const handler = async (req: NowRequest, res: NowResponse) => {
  if (req.method === "OPTIONS") {
    return send(res, 200);
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
      return {
        db: {
          users: await getCollection("users"),
          goals: await getCollection("goals"),
        },
      };
    },
  });

  return server.createHandler({ path: "/api/graphql" })(req, res);
};

export default cors(handler);
