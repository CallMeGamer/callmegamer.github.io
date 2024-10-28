// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAxlEBkfszBkZt6BVezv4_oS9_paOz9NXs",
    authDomain: "callmegamergamehub.firebaseapp.com",
    projectId: "callmegamergamehub",
    storageBucket: "callmegamergamehub.appspot.com",
    messagingSenderId: "640120758569",
    appId: "1:640120758569:web:11370e01ffacdf2c1b1738",
    databaseURL: "https://callmegamergamehub-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
