import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'fir-chat-f42b9.firebaseapp.com',
  databaseURL: 'https://fir-chat-f42b9-default-rtdb.firebaseio.com',
  projectId: 'fir-chat-f42b9',
  storageBucket: 'fir-chat-f42b9.appspot.com',
  messagingSenderId: '625074928431',
  appId: '1:625074928431:web:685bed7147ab2f00d9ffda',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
