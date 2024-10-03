import mongoose from 'mongoose';

let connected = false;

const connectDb = async () => {
  mongoose.set('strictQuery', false);

  // if already connected, then don't connect again
  if (connected) {
    console.log('Already connected to database');
    return;
  }

  // connect to database
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to database');
    connected = true;
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};

export default connectDb;