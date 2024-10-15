// services/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut, // renamed for clarity
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";

// Function to create a user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Function to sign in a user with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Function to sign in a user with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google Sign-In Result: ", result);
    return result; // return the result for further processing
  } catch (error) {
    console.error("Error during Google sign-in: ", error);
    throw error; // propagate the error
  }
};

// Function to sign out a user
export const doSignOut = async () => {
  try {
    await firebaseSignOut(auth); // sign out the user
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error; // propagate the error
  }
};
