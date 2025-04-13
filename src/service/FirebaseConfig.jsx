import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5ExAjJYTA1912zKRyp3OJS0oCXBxNkDM",
  authDomain: "ai-trip-planner-75de2.firebaseapp.com",
  projectId: "ai-trip-planner-75de2",
  storageBucket: "ai-trip-planner-75de2.firebasestorage.app",
  messagingSenderId: "289337156503",
  appId: "1:289337156503:web:7457c04ed99ed81ac21ad2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
