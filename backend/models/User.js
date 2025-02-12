import mongoose from "mongoose"; // Import Mongoose for MongoDB object modeling

// Define the schema for the User collection
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    },
    jobApplications: {
        type: [String],
        default: []
    }
}, {
    timestamps: true    // Automatically adds createdAt and updatedAt timestamps
});

// Export the Mongoose model based on the defined schema
export default mongoose.model("User", UserSchema);