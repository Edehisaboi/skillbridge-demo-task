import express from "express"; // Import Express framework for handling HTTP requests
import cors from "cors"; // Import CORS middleware to enable cross-origin requests
import { connectDB } from "./database/connection.js"; // Import the database connection function
import authRoutes from "./routes/authRoutes.js"; // Import authentication-related routes
import userRoutes from "./routes/userRoutes.js"; // Import user-related routes

const PORT = process.env.PORT || 5050; // Define the server port, using environment variable or default to 5050
const app = express(); // Create an instance of the Express application

app.use(cors()); // Enable CORS for handling cross-origin requests
app.use(express.json()); // Middleware to parse incoming JSON requests

// Immediately connect to the MongoDB database
(async () => {
    await connectDB();
})();

// Define route handlers
app.use("/api/auth", authRoutes); // Mount authentication routes under "/api/auth"
app.use("/api/user", userRoutes); // Mount user-related routes under "/api/user"

// Start the Express server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
