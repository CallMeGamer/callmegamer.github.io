// Firebase SDK import (you can add this in your scripts.js as a module if needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Check if user is logged in on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Display user name and email
        document.getElementById('user-name').textContent = user.displayName;
        document.getElementById('user-email').textContent = user.email;

        // Fetch user's currency from the database
        const userId = user.uid;
        get(ref(db, 'users/' + userId + '/currency')).then((snapshot) => {
            if (snapshot.exists()) {
                document.getElementById('user-currency').textContent = snapshot.val();
            } else {
                document.getElementById('user-currency').textContent = "No data available";
            }
        });
    } else {
        // If user is not logged in, redirect to the login page
        window.location.href = 'index';
    }
});

// Handle sign out
function handleSignOut() {
    signOut(auth).then(() => {
        window.location.href = 'index';
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
}

// Add event listener to sign out button
document.getElementById('signOutBtn').addEventListener('click', handleSignOut);

// Handle dark mode toggle
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark');

    // Update dark mode icon
    const darkModeIcon = document.getElementById('darkModeIcon');
    if (body.classList.contains('dark')) {
        darkModeIcon.textContent = '🌑';
    } else {
        darkModeIcon.textContent = '☀️';
    }
}

// Add event listener to dark mode toggle button
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
