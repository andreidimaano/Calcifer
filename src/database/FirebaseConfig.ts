require('dotenv').config();
import firebase from 'firebase';
// import firebase from 'firebase'
import 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
};

export let initializeFirebase = () => firebase.initializeApp(firebaseConfig);