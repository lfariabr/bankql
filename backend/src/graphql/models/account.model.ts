import mongoose, { Schema, Document, Model, model } from "mongoose";

export interface IAccount extends Document {
    name: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth: Date;
    accountNumber: string;
}

const AccountSchema = new Schema<IAccount>(
    {
        name: { type: String, required: true },
        balance: { type: Number, required: true },
        dateOfBirth: { type: Date, required: true },
        accountNumber: { 
            type: String, 
            required: true, 
            unique: true,
            default: () => {
                return Math.floor(1000000000 + Math.random() * 9000000000).toString();
            }
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                
                // Format dates to ISO string
                ret.createdAt = doc.createdAt.toISOString();
                ret.updatedAt = doc.updatedAt.toISOString();
                ret.dateOfBirth = doc.dateOfBirth.toISOString();
                
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

export const Account: Model<IAccount> = model<IAccount>('Account', AccountSchema);

export default Account;
