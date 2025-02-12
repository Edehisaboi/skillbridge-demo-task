import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { loginUser } from "../api/auth"; // Import authentication API function
import "../styles/auth.css"; // Import styles for authentication pages

function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Email and Password are required!");
            return;
        }

        const data = await loginUser(formData); // Call login API function
        if (data.token) {
            localStorage.setItem("token", data.token); // Store token in local storage
            localStorage.setItem("userId", data.userId); // Store user ID
            setIsAuthenticated(true); // Update authentication state
            alert("Login Successful!");
            navigate("/dashboard"); // Redirect to dashboard
        } else {
            alert(data.message || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login to SkillBridge</h2>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Login</button>

                    <p>
                        Don&apos;t have an account?
                        <span className="link" onClick={() => navigate("/signup")}> Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

// Add prop types validation
Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
