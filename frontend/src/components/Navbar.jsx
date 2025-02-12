import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h1>SkillBridge</h1>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
