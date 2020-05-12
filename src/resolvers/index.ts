import { IResolvers } from "apollo-server-micro";
import {
  createItem,
  getItemById,
  allItemsByIndex,
  updateItem,
} from "../helpers/fauna";

type ResolverFn = (parent: any, args: any, ctx: any) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

const queries: ResolverMap = {
  goals: async (_, __) => {
    const goals = await allItemsByIndex("all_goals_by_user", "1");
    console.log(goals);

    return goals;
  },
  goal: async (_, { goalId }: { goalId: string }) => {
    const goal = await getItemById("goals", goalId);
    return goal;
  },
};

const mutations: ResolverMap = {
  createGoal: async (_, args) => {
    const goal = await createItem("goals", {
      ...args,
      daysCompleted: [],
      status: "new",
    });

    return goal;
  },
  updateGoal: async (_, args) => {
    const { goalId, ...updatable } = args;
    const goal = await updateItem("goals", goalId, updatable);

    return goal;
  },
  deleteGoal: async (_, { goalId }) => {
    //await db.goals.findOneAndDelete({ _id: oid(goalId) });
    return true;
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
