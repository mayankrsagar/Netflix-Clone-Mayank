// Import Firebase functions
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjq2dD2j-HZ_fP2vOg7hxPubuqDlho64A",
  authDomain: "netflix-clone-194fd.firebaseapp.com",
  projectId: "netflix-clone-194fd",
  storageBucket: "netflix-clone-194fd.firebasestorage.app",
  messagingSenderId: "198056648272",
  appId: "1:198056648272:web:311cf25cac6261d1423b55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Error messages map
const errorMessages = {
  "auth/invalid-email": "The email address is badly formatted.",
  "auth/user-disabled": "This user account has been disabled.",
  "auth/user-not-found": "No user found with this email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Invalid credentials. Please check your details.",
  "auth/email-already-in-use": "This email is already registered. Please log in.",
  "auth/weak-password": "Password should be at least 6 characters long.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  // Add more error codes and messages as needed
};

// Error handling function
const handleAuthError = (error, enqueueSnackbar) => {
  const message =
    errorMessages[error.code] ||
    "An unexpected error occurred. Please try again.";
  console.error("Authentication Error:", error.message);
  enqueueSnackbar(message, { variant: "error" });
  throw error;
};

// Sign-up function
const signUp = async (name, email, password, enqueueSnackbar) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    enqueueSnackbar("User created successfully!", { variant: "success" });
    return user;
  } catch (error) {
    handleAuthError(error, enqueueSnackbar);
  }
};

// Login function
const login = async (email, password, enqueueSnackbar) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    enqueueSnackbar("User logged in successfully!", { variant: "success" });
    return userCredential.user;
  } catch (error) {
    handleAuthError(error, enqueueSnackbar);
  }
};

// Logout function
const logout = async (enqueueSnackbar) => {
  try {
    await signOut(auth);
    enqueueSnackbar("User logged out successfully!", { variant: "success" });
  } catch (error) {
    handleAuthError(error, enqueueSnackbar);
  }
};

export { auth, db, login, logout, signUp };
