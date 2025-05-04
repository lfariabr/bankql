import { gql } from 'apollo-server-koa';

export const typeDefs = gql`
  scalar DateTime

  type Query {
    accounts: [Account]
    transactions: [Transaction]
    account(id: ID!): Account
  }

  type Mutation {
    createAccount(name: String!, balance: Float!, dateOfBirth: DateTime!): Account!
    createTransaction(amount: Float, senderAccountId: ID, receiverAccountId: ID): Transaction!
  }

  type Account {
    id: ID!
    name: String!
    balance: Float!
    createdAt: DateTime!
    updatedAt: DateTime
    dateOfBirth: DateTime!
    accountNumber: String!
  }

  type Transaction {
    _id: ID
    amount: Float
    senderAccountId: ID
    receiverAccountId: ID
    createdAt: DateTime
  }
`;
