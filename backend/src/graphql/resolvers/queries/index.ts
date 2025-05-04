import { Account } from '../../models/account.model';
import { Transaction } from '../../models/transaction.model';

export const queryResolvers = {
  accounts: async () => {
    return await Account.find();
  },
  transactions: async () => {
    return await Transaction.find();
  }
};
