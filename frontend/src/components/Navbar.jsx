import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "../styles/Navbar.css"; // Import navbar styles
import { useNavigate } from "react-router-dom"; // Import navigation hook

const Navbar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove authentication token
        localStorage.removeItem("userId"); // Remove stored user ID
        setIsAuthenticated(false); // Update authentication state
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="navbar">
            <h1>SkillBridge</h1>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

// Add prop types validation
Navbar.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default Navbar;