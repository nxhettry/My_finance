import mongoose from "mongoose";

const connectDb = async () => {
  if (process.env.MONGODB_URI === undefined) {
    throw new Error("MONGODB_URI is not defined");
  }
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);

    return connection;
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDb;
