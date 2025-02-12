const API_URL = "http://localhost:5050/api/auth"; // Backend authentication API base URL

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return await response.json(); // Return response as JSON
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

// Function to log in a user
export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return await response.json(); // Return response as JSON
    } catch (error) {
        console.error("Error logging in:", error);
    }
};
