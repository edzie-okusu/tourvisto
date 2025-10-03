// Import the functions you need from the SDKs you need
import { initializeApp, getApp,getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCL2ozKJIvTwTy6RY9FGauPSWMGitIjd08",
    authDomain: "tourvisto-4c6a8.firebaseapp.com",
    projectId: "tourvisto-4c6a8",
    storageBucket: "tourvisto-4c6a8.firebasestorage.app",
    messagingSenderId: "529945294015",
    appId: "1:529945294015:web:5ce384d6cdd29600dd420a",
    measurementId: "G-MMS011Z7E5"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)
