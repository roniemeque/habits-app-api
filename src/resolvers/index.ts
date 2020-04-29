import { objectives } from "../mocks";

const resolvers = {
  Query: {
    objectives: () => objectives,
  },
};

export default resolvers;
