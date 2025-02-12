import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS_URI;

if (!uri) {
    throw new Error("Missing ATLAS_URI in environment variables");
}

export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {});
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

