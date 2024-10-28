// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
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
const auth = getAuth(app);
const db = getDatabase(app);

// Function to get user's data
export async function getUserData(email) {
    const userRef = ref(db, `users/${email}`);
    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No user data found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

// Function to set or update user's data
export function setUserData(email, data) {
    const userRef = ref(db, `users/${email}`);
    return update(userRef, data)
        .then(() => console.log("User data updated successfully"))
        .catch((error) => console.error("Error updating user data:", error));
}

// Initial setup of user's data if not already set
export function initializeUserData(email, username, currency = 100, preference = "light") {
    const userRef = ref(db, `users/${email}`);
    const initialData = {
        Username: username,
        Currency: currency,
        preference: preference
    };

    return set(userRef, initialData)
        .then(() => console.log("User data initialized successfully"))
        .catch((error) => console.error("Error initializing user data:", error));
}
