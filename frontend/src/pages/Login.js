import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await login({ email, password });
            navigate("/");
        } catch (err) {
            setError("Invalid email or password. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
