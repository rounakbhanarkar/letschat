import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB02NORo1bXr-egdCU8NygBXojbODgniUE",
  authDomain: "letschat-d0c84.firebaseapp.com",
  projectId: "letschat-d0c84",
  storageBucket: "letschat-d0c84.appspot.com",
  messagingSenderId: "165772772527",
  appId: "1:165772772527:web:f590db47de6a27eaab405a",
  measurementId: "G-DRLTENK4GN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
