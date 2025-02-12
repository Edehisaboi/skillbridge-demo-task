import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import "../styles/auth.css";

function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Email and Password are required!");
            return;
        }

        const data = await loginUser(formData);
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            setIsAuthenticated(true);
            alert("Login Successful!");
            navigate("/dashboard");
        } else {
            alert(data.message || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login to SkillBridge</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

                    <button type="submit">Login</button>

                    <p>Don't have an account? <span className="link" onClick={() => navigate("/signup")}>Sign Up</span></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
