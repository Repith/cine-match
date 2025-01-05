import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const connectionString =
      process.env.MONGO_URI || 'mongodb://localhost:27017/cinematch';
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectToDatabase;
