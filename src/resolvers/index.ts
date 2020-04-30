import { ResolverMap } from "../ts/apollo";
import { IResolvers } from "apollo-server-micro";
import { oid } from "../helpers/database";

const queries: ResolverMap = {
  goals: async (_, __, { db }) => await db.goals.find().toArray(),
  goal: async (_, { goalId }: { goalId: string }, { db }) =>
    await db.goals.findOne({ _id: oid(goalId) }),
};

const mutations: ResolverMap = {
  createGoal: async (_, args, { db }) => {
    const {
      ops: [goal],
    } = await db.goals.insertOne({
      ...args,
      daysCompleted: [],
      status: "new",
    });

    return goal;
  },
  updateGoal: async (_, args, { db }) => {
    const { goalId, ...updatable } = args;

    const { value } = await db.goals.findOneAndUpdate(
      { _id: oid(goalId) },
      { $set: { ...updatable } },
      {
        returnOriginal: false,
      }
    );
    return value;
  },
};

interface Resolvers extends IResolvers {
  [field: string]: ResolverMap;
}

const resolvers: Resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
};

export default resolvers;
