import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    goals: [Goal]
  }

  type Goal {
    id: ID!
    title: String!
    icon: String
    owner: User
    daysLength: Int
    daysCompleted: [String]
    status: String
  }

  type Query {
    goals(userId: ID!): [Goal]
    goal(goalId: ID!): Goal
  }

  type Mutation {
    createGoal(
      title: String!
      icon: String
      userId: ID!
      daysLength: Int!
    ): Goal
    updateGoal(
      goalId: ID!
      title: String
      icon: String
      userId: ID
      daysLength: Int
      daysCompleted: [String]
      status: String
    ): Goal
    deleteGoal(goalId: ID!): Boolean
  }
`;

export default typeDefs;
