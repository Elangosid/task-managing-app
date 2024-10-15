// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG-lmWsDOdvpRL-zsnWfgeM1_bkMGVVA8",
  authDomain: "task-manager-a59ea.firebaseapp.com",
  projectId: "task-manager-a59ea",
  storageBucket: "task-manager-a59ea.appspot.com",
  messagingSenderId: "94390848747",
  appId: "1:94390848747:web:fde97922a986b2101c02ae",
  measurementId: "G-RGTJKVJ4BB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
