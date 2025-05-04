import mongoose from 'mongoose';
import { Account } from '../graphql/models/account.model';
import { config } from 'dotenv';

// npm run clean-accounts-db

// Load environment variables
config();

async function cleanAccountsDb() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bankql');
        console.log('🟢 Connected to MongoDB');

        // Delete all accounts
        const result = await Account.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} accounts`);

        // Close the connection
        await mongoose.disconnect();
        console.log('🔴 Disconnected from MongoDB');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error cleaning accounts database:', error);
        process.exit(1);
    }
}

cleanAccountsDb();