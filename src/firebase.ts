// Import the functions you need from the SDKs you need

import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "okhati-demo",
    storageBucket: "okhati-demo.appspot.com",
    messagingSenderId: "800949299186",
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: "G-DR06GKTGZC"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

