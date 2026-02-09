import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyCvDE20ZuPim1Hu4stE95ogf7UhAeIsrAA",
  authDomain: "nextround-ai.firebaseapp.com",
  projectId: "nextround-ai",
  storageBucket: "nextround-ai.firebasestorage.app",
  messagingSenderId: "807322514414",
  appId: "1:807322514414:web:9e7eb6da0661434aee54ff"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
