import mongoose from "mongoose";

const connection_url = process.env.MONGO_URI;

export const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(connection_url || '');
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Stop the process if the connection fails
  }
};