import mongoose from 'mongoose';

const connectToMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectToMongo;
