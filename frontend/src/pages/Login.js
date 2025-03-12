import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [shake, setShake] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setShake(false);

        try {
            await login({ email, password });
            navigate("/");
        } catch (err) {
            setError("Invalid email or password. Try again.");
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center min-h-screen bg-gray-100"
        >
            <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                {error && (
                    <motion.p 
                        className="text-red-500 font-medium mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {error}
                    </motion.p>
                )}
                <motion.form 
                    onSubmit={handleSubmit} 
                    className="flex flex-col space-y-4"
                    animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.2 }}
                >
                    <motion.input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <motion.input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <motion.button 
                        type="submit" 
                        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Login
                    </motion.button>
                </motion.form>
            </motion.div>
        </motion.div>
    );
};

export default Login;
