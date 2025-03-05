import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // ✅ Get AuthContext

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { register } = useContext(AuthContext);  // ✅ Get register function
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await register({ name, email, password }); // ✅ Use register function
            navigate("/"); // ✅ Redirect to homepage after registering
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

const styles = {
    container: { textAlign: "center", padding: "50px" },
    form: { display: "flex", flexDirection: "column", width: "300px", margin: "auto", gap: "10px" },
    error: { color: "red", fontWeight: "bold" }
};

export default Register;
