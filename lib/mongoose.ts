import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URI) {
        return Promise.reject('Missing MONGODB_URI environment variable');
    }
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("=> MONGODB connected");
  } catch (error) {
    console.log(error);
    
  }
  
};
