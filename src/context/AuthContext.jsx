import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  loginAdmin, 
  logoutAdmin, 
  subscribeToAuth,
  checkIsAdmin
} from "../services/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      if (user) {
        // double check if they are authorized in admins collection
        const isAdmin = await checkIsAdmin(user.email);
        if (isAdmin) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
          // logout if unauthorized
          await logoutAdmin();
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const user = await loginAdmin(email, password);
      setCurrentUser(user);
      setLoading(false);
      return user;
    } catch (err) {
      setError(err.message || "Failed to sign in");
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
      setCurrentUser(null);
      setLoading(false);
    } catch (err) {
      setError("Failed to sign out");
      setLoading(false);
      throw err;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
