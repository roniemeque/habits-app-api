import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    objectives: [Objective]
  }

  type CompletedDay {
    objective: ID!
    date: String!
  }

  type Objective {
    id: ID!
    title: String!
    icon: String
    owner: ID
    length: Int
    daysCompleted: [CompletedDay]
  }

  type Query {
    objectives: [Objective]
  }
`;

export default typeDefs;
