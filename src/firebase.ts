import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuvCp1whB28xbedtfgB1cGGkDvy7Rk0Dk",
  authDomain: "taskmanagement-77a85.firebaseapp.com",
  projectId: "taskmanagement-77a85",
  storageBucket: "taskmanagement-77a85.firebasestorage.app",
  messagingSenderId: "24618323007",
  appId: "1:24618323007:web:eee455a18d40364e68fc8a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
