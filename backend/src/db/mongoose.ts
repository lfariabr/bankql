import mongoose from 'mongoose';

export default {
  connect: async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/woovi_study';
    await mongoose.connect(mongoUri);
    console.log('🚀 Mongoose connected');
  },
};