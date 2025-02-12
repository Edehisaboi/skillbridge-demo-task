import jwt from "jsonwebtoken"; // Import JWT for token verification

// Middleware to authenticate requests using JWT
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization"); // Extract token from request headers

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET); // Verify token and attach decoded user data to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" }); // Return an error if token verification fails
    }
};

export default authMiddleware;
