import mongoose, { Schema, Document, Types } from "mongoose";
import { Account } from "./account.model";

export interface ITransaction extends Document {
    amount: number;
    senderAccount: Types.ObjectId;
    receiverAccount: Types.ObjectId;
    createdAt: Date;
}
const TransactionSchema = new Schema<ITransaction>({    
    amount: { type: Number, required: true },
    senderAccount: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    receiverAccount: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
