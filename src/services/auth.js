import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

// Login admin
export const loginAdmin = async (email, password) => {
  try {
    // 1. Sign in with firebase auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 2. Check if the user is in the admins collection
    const adminDocRef = doc(db, "admins", user.email.toLowerCase());
    const adminDoc = await getDoc(adminDocRef);
    
    if (!adminDoc.exists()) {
      // If not in admins table, log out and throw error
      await signOut(auth);
      throw new Error("Unauthorized access. This account is not registered as an administrator.");
    }
    
    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Logout admin
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Check if user is admin
export const checkIsAdmin = async (email) => {
  if (!email) return false;
  try {
    const adminDocRef = doc(db, "admins", email.toLowerCase());
    const adminDoc = await getDoc(adminDocRef);
    return adminDoc.exists();
  } catch (error) {
    console.error("Check admin status error:", error);
    return false;
  }
};

// Listen to auth state changes
export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};
