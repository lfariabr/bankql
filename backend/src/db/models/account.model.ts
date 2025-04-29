import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
    name: string;
    balance: number;
}

const AccountSchema = new Schema<IAccount>({
    name: { type: String, required: true },
    balance: { type: Number, required: true },
});

export const Account = mongoose.model<IAccount>('Account', AccountSchema);

export default Account;
