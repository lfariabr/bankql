import { gql } from 'apollo-server-koa';
import { Account } from '../db/models/account.model';
import { Transaction } from '../db/models/transaction.model';

export const typeDefs = gql`
  type Transaction {
    _id: ID
    amount: Float
    senderAccountId: ID
    receiverAccountId: ID
    createdAt: String
  }

  type Account {
    name: String
    balance: Float
  }

  type Query {
    hello: String
    accounts: [Account]
    transactions: [Transaction]
  }

  type Mutation {
    createAccount(name: String, balance: Float): Account!
    createTransaction(amount: Float, senderAccountId: ID, receiverAccountId: ID): Transaction!
  }
`;

export const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    accounts: async () => {
      return await Account.find();
    },
    transactions: async () => {
      return await Transaction.find();
    }
  },
  Mutation: {
    createAccount: async (_: any, {name, balance} : { name: string, balance: number }) => {
      const account = new Account({ name, balance });
      // Adding logging
      console.log('Creating account:', account);
      return await account.save();
    },
    createTransaction: async (_: any, {amount, senderAccountId, receiverAccountId} : { amount: number, senderAccountId: string, receiverAccountId: string }) => {
      const transaction = new Transaction({ amount, senderAccountId, receiverAccountId });
      // Adding logging
      console.log('Creating transaction:', transaction);
      return await transaction.save();
    }
  }
};

