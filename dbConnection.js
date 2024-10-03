import mongoose from "mongoose";

async function connectDB(mongo_uri) {
  try {
    await mongoose.connect(mongo_uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;
