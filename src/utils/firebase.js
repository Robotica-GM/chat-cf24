import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5leiqFi227fu6ydC3sM3AAORioP34iHI",
  authDomain: "chat-c98f2.firebaseapp.com",
  projectId: "chat-c98f2",
  storageBucket: "chat-c98f2.appspot.com",
  messagingSenderId: "811611470730",
  appId: "1:811611470730:web:5f25bfce16f6449f88a673",
  measurementId: "G-XNBKP7LH9K"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const analytics = getAnalytics(app);
