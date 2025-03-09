import React, { useState, useEffect, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
    const { user, updateProfile, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            await updateProfile({ name, email, password });
            setMessage("Profile updated successfully!");
        } catch (error) {
            setMessage("Error updating profile. Try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h2>👤 Your Profile</h2>
            {message && <p style={styles.message}>{message}</p>}

            <form onSubmit={handleUpdate} style={styles.form}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="New Password (Optional)" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

const styles = {
    container: { textAlign: "center", padding: "50px" },
    form: { display: "flex", flexDirection: "column", width: "300px", margin: "auto", gap: "10px" },
    message: { fontWeight: "bold" },
};

export default Profile;
