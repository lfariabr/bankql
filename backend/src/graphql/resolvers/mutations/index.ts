import { Account } from '../../models/account.model';
import { Transaction } from '../../models/transaction.model';

export const mutationResolvers = {
  
  createAccount: async (
    _: any, 
    { name, balance, dateOfBirth }: { name: string; balance: number; dateOfBirth: string }
  ) => {
    const account = new Account({ 
      name, 
      balance, 
      dateOfBirth: new Date(dateOfBirth) 
    });
    console.log('Creating account:', account);
    return await account.save();
  },

  createTransaction: async (
    _: any, 
    {amount, senderAccountId, receiverAccountId} : { amount: number, senderAccountId: string, receiverAccountId: string }) => {
    const transaction = new Transaction({ amount, senderAccountId, receiverAccountId });
    console.log('Creating transaction:', transaction);
    return await transaction.save();
  }
};
