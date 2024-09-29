import { ReactElement, useEffect, useState } from "react";
import './Profile.css';

// Helper functions to get and save data from/to local storage
const saveProfileToLocalStorage = (profile: { name: string, address: string, email: string, profilePicture: string }) => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
};

const getProfileFromLocalStorage = () => {
    const storedProfile = localStorage.getItem("userProfile");
    return storedProfile ? JSON.parse(storedProfile) : { name: "", address: "", email: "", profilePicture: "" };
};


export const Profile = (): ReactElement => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [notification, setNotification] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Load profile data from local storage when the component mounts
    useEffect(() => {
        const profile = getProfileFromLocalStorage();
        setName(profile.name);
        setAddress(profile.address);
        setEmail(profile.email);
        setProfilePicture(profile.profilePicture);
    }, []);

    // Handle form submission
    const handleSubmit = () => {
        // Basic validation
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        // Save to local storage
        const profile = { name, address, email, profilePicture };
        saveProfileToLocalStorage(profile);

        // Clear error and show notification
        setError(null);
        setNotification("Profile saved successfully!");

        // Clear the notification after 4 seconds
        setTimeout(() => setNotification(null), 4000);
    };

    // Handle profile picture upload
    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setProfilePicture(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>

            <div className="profile-form">
                <div className="form-section">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-section">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="form-section">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-section">
                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                    />
                    {profilePicture && <img src={profilePicture} alt="Profile" style={{ height: "30vh" }} />}
                </div>
                <div className="button-container">
                    <button onClick={handleSubmit}>Save Profile</button>
                </div>
                
            </div>
            

            {/* Display notification if data is saved */}
            {notification && <p style={{ color: "green" }}>{notification}</p>}

            {/* Display error message if there's a validation error */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}