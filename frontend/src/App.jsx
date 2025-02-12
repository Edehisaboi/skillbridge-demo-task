import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    // Update authentication state whenever the route changes
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("token"));
    }, [location]);

    return (
        <div>
            {/* Show the Navbar only if the user is authenticated */}
            {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

            <Routes>
                {/* Redirect to dashboard if authenticated, otherwise go to signup */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signup" />} />

                {/* Signup and login routes should redirect authenticated users to the dashboard */}
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

                {/* Protect the dashboard route: only accessible if authenticated */}
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;