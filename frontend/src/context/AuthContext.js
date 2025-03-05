import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getUserProfile, updateUserProfile } from "../api/api"; // ✅ Import updateUserProfile

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
          getUserProfile(token)
              .then(response => setUser(response.data))
              .catch(() => {
                  localStorage.removeItem("token");
                  setUser(null);
              });
      }
      setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
      try {
          const response = await loginUser({ email, password });
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
      } catch (error) {
          console.error("Login failed:", error);
          throw error;
      }
  };

  const register = async (userData) => {
      try {
          const response = await registerUser(userData);
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
      } catch (error) {
          console.error("Registration failed:", error);
          throw error;
      }
  };

  const logout = () => {
      setUser(null);
      localStorage.removeItem("token");
  };

  const updateProfile = async (userData) => {
      try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          const response = await updateUserProfile(userData, token);
          setUser(response.data);
          return response.data;
      } catch (error) {
          console.error("Profile update failed:", error);
          throw error;
      }
  };

  return (
      <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
          {!loading && children}
      </AuthContext.Provider>
  );
};

// ✅ Correct Named Export
export { AuthContext };
export default AuthProvider;
