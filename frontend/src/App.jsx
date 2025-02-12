import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("token"));
    }, [location]);

    return (
        <div>
            {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signup" />} />

                <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
