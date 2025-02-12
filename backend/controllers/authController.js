import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const cleanedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: cleanedEmail });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password.trim(), 10);
        const newUser = new User({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: cleanedEmail,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const cleanedEmail = email.trim().toLowerCase();
        const foundUser = await User.findOne({ email: cleanedEmail });

        if (!foundUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password.trim(), foundUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: foundUser._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token, userId: foundUser._id });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};