import { useState, useEffect } from "react";
import "../styles/dashboard.css";

const companies = ["Meta", "Netflix", "Google", "Amazon", "Microsoft", "Tesla", "Apple"];

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const userId = localStorage.getItem("userId");

    // Fetch user profile data on component mount
    useEffect(() => {
        if (!userId) return;

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found! User must be logged in.");
            return;
        }

        fetch(`http://localhost:5050/api/user/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        })
            .then((res) => res.ok ? res.json() : Promise.reject(`HTTP error! Status: ${res.status}`))
            .then((data) => {
                setUserData({
                    ...data,
                    skills: Array.isArray(data.skills) ? data.skills.join(", ") : ""
                });
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, [userId]);

    // Handle input changes for form fields
    const handleChange = (e) => {
        setUserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle job selection (toggle application status for a company)
    const handleJobSelection = (company) => {
        setUserData((prev) => ({
            ...prev,
            jobApplications: prev.jobApplications
                ? prev.jobApplications.includes(company)
                    ? prev.jobApplications.filter((c) => c !== company) // Remove if already selected
                    : [...prev.jobApplications, company] // Add if not selected
                : [company], // Initialize if undefined
        }));
    };

    // Save updated profile data
    const handleSave = async () => {
        if (!userData.firstName || !userData.lastName || !userData.email) {
            alert("First Name, Last Name, and Email are required.");
            return;
        }

        const response = await fetch(`http://localhost:5050/api/user/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                firstName: userData.firstName.trim(),
                lastName: userData.lastName.trim(),
                email: userData.email.toLowerCase().trim(),
                bio: userData.bio || "",
                skills: userData.skills
                    ? userData.skills.split(/,/g).map(skill => skill.trim()).filter(skill => skill !== "")
                    : [],
                jobApplications: userData.jobApplications || [],
            }),
        });

        if (response.ok) {
            alert("Profile updated successfully!");
            setIsEditing(false);
        } else {
            alert("Failed to update profile");
        }
    };

    if (!userData) return <h2>Loading user data...</h2>;

    return (
        <div className="dashboard-container">
            <h2>Hello, {userData.firstName}</h2>

            <div className="profile-section">
                <h3>Profile Details</h3>
                {!isEditing ? (
                    // Display profile information
                    <div className="user-details">
                        <p><strong>First Name:</strong> {userData.firstName}</p>
                        <p><strong>Last Name:</strong> {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Skills:</strong> {userData.skills || "None"}</p>
                        <p><strong>Bio:</strong> {userData.bio || "No bio available"}</p>
                        <p><strong>Applied Jobs:</strong> {userData.jobApplications.length > 0 ? userData.jobApplications.join(", ") : "None"}</p>
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                ) : (
                    // Editable form fields
                    <>
                        <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} placeholder="First Name" />
                        <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Last Name" />
                        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
                        <textarea name="skills" value={userData.skills} onChange={handleChange} placeholder="List your skills, separated by commas"></textarea>
                        <textarea name="bio" value={userData.bio} onChange={handleChange} placeholder="Write your bio..."></textarea>

                        <h3>Select Companies You&apos;ve Applied To</h3>
                        <div className="company-list">
                            {companies.map((company) => (
                                <label key={company} className="company-option">
                                    <input
                                        type="checkbox"
                                        checked={userData.jobApplications.includes(company)}
                                        onChange={() => handleJobSelection(company)}
                                    />
                                    {company}
                                </label>
                            ))}
                        </div>

                        <button className="save-btn" onClick={handleSave}>Save Changes</button>
                        <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
