import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQQLdmtMmF53iPEfWZuQWXDvLdzfPNP64",
  authDomain: "fir-react-crud-94728.firebaseapp.com",
  projectId: "fir-react-crud-94728",
  storageBucket: "fir-react-crud-94728.firebasestorage.app",
  messagingSenderId: "742673567700",
  appId: "1:742673567700:web:c596c6d3df465c99d81041"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);