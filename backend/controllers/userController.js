import User from "../models/User.js"; // Import the User model

// Fetch the profile details of the authenticated user
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update the profile details of the authenticated user
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update only the provided fields, keeping existing values where necessary
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                bio: req.body.bio !== undefined ? req.body.bio : user.bio,
                skills: req.body.skills,
                jobApplications: req.body.jobApplications,
            },
            { new: true, runValidators: true } // Return the updated document and enforce schema validation
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
