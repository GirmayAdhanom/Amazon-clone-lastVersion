// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import "firebase/compat/firestore";
// import "firsbase/compat/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhGBghsnJxhlblGCkxZHFOI9WXKX1RQC0",
  authDomain: "clone-2025-8603c.firebaseapp.com",
  projectId: "clone-2025-8603c",
  storageBucket: "clone-2025-8603c.firebasestorage.app",
  messagingSenderId: "1015022463677",
  appId: "1:1015022463677:web:ea5d6ef70cef42a461a5d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

