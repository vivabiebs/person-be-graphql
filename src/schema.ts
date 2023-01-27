import { gql } from "apollo-server";

const typeDefs = gql`
  type Person {
    id: ID!
    firstname: String!
    lastname: String!
    age: Int!
    gender: Gender!
    status: Status!
    birthdate: String!
    haveChild: Boolean!
    children: [Person!]
    parents: [Person!]
  }

  enum Gender {
    FEMALE
    MALE
    OTHER
  }

  enum Status {
    SINGLE
    MARRIED
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }

  type Query {
    person(id: ID!): Person!
    people(filter: PersonFilterInput): [Person!]
  }

  type Subscription {
    person: PersonSubscriptionPayload!
    createPerson: Person!
    deletePerson: Person!
    updatePerson: Person!
  }

  type Mutation {
    createPerson(input: CreatePersonInput): Person!
    updatePerson(id: ID!, input: UpdatePersonInput): Person!
    deletePerson(id: ID!): Person
  }

  input CreatePersonInput {
    id: ID!
    firstname: String!
    lastname: String!
    age: Int!
    gender: Gender!
    status: Status!
    birthdate: String!
    haveChild: Boolean!
    # children: [CreatePersonInput!]
    # parents: [CreatePersonInput!]
    children: [ID!]
    parents: [ID!]
  }

  input UpdatePersonInput {
    id: ID
    firstname: String
    lastname: String
    age: Int
    gender: Gender
    status: Status
    birthdate: String
    haveChild: Boolean
    children: [ID!]
    parents: [ID!]
  }

  input PersonFilterInput {
    gender: [Gender!]
    age: Int
    status: Status
  }

  type PersonSubscriptionPayload {
    mutation: MutationType!
    data: Person!
  }
`;

export default typeDefs;
