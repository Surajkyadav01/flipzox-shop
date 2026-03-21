import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAvxaZytGaoDbZ8PwPE6Ey2B1FMR6F3pU",
  authDomain: "flipzox-3155c.firebaseapp.com",
  projectId: "flipzox-3155c",
  storageBucket: "flipzox-3155c.firebasestorage.app",
  messagingSenderId: "81629170644",
  appId: "1:81629170644:web:2ad6487001e1ddfa30a441",
  measurementId: "G-CWC8HY4LEM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
