import mongoose from "mongoose";    // Import Mongoose for MongoDB connection handling
import dotenv from "dotenv";    // Import dotenv to manage environment variables

// Load environment variables from a .env file
dotenv.config();

// Retrieve MongoDB connection URI from environment variables
const uri = process.env.ATLAS_URI;

if (!uri) {
    throw new Error("Missing ATLAS_URI in environment variables");
}

// Function to establish a connection to the MongoDB database
export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {});
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

