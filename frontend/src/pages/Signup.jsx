import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth"; // Import the registration API function
import "../styles/auth.css"; // Import authentication page styles

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all required fields are filled
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            alert("All fields are required!");
            return;
        }

        const data = await registerUser(formData); // Call the registration API function
        if (data && data.message === "User registered successfully") {
            alert("Registration successful! Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } else {
            alert(data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Sign Up for SkillBridge</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Register</button>

                    <p>
                        Already have an account?
                        <span className="link" onClick={() => navigate("/login")}> Login</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
