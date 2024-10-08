import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPyVF7qjHfF5XY-3BBWFRaWtOThq3LMl0",
  authDomain: "track-expense-7cc2f.firebaseapp.com",
  projectId: "track-expense-7cc2f",
  storageBucket: "track-expense-7cc2f.appspot.com",
  messagingSenderId: "338360446939",
  appId: "1:338360446939:web:222ade76fedc06ff9fc1fe",
  measurementId: "G-MHP0XMQ3X5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
