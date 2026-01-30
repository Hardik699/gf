import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://hardik:Hardik1@infoseum.a4beisu.mongodb.net/?appName=Infoseum";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}

export async function disconnectDB() {
  try {
    if (isConnected) {
      await mongoose.disconnect();
      isConnected = false;
      console.log("✅ MongoDB disconnected");
    }
  } catch (error) {
    console.error("❌ MongoDB disconnection failed:", error);
    throw error;
  }
}

export { mongoose };
