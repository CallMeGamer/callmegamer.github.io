// Firebase SDK import
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

// In-page console logging function
function logMessage(message) {
    const consoleBox = document.getElementById('console-box');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    consoleBox.appendChild(messageElement);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

// 1. Check if the user is logged in on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        logMessage("User is logged in.");
        document.getElementById('user-name').textContent = user.displayName || "Guest";
        document.getElementById('user-email').textContent = user.email || "Not provided";

        // Fetch and display currency
        const userId = user.uid;
        get(ref(db, `users/${userId}/currency`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    document.getElementById('user-currency').textContent = snapshot.val();
                    logMessage(`Currency loaded: ${snapshot.val()}`);
                } else {
                    document.getElementById('user-currency').textContent = "No data";
                    logMessage("No currency data available.");
                }
            })
            .catch((error) => {
                console.error("Error fetching currency:", error);
                logMessage("Error fetching currency data.");
            });
    } else {
        logMessage("User not logged in. Redirecting to login page.");
        window.location.href = 'index';
    }
});

// 2. Handle sign out
document.getElementById('signOutBtn').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            logMessage("User signed out. Redirecting to login page.");
            window.location.href = 'index';
        })
        .catch((error) => {
            console.error("Error signing out:", error);
            logMessage("Error signing out.");
        });
});

// 3. Handle dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.getElementById('darkModeIcon');
    const isDarkMode = document.body.classList.contains('dark');
    icon.textContent = isDarkMode ? '🌑' : '☀️';
    logMessage(`Dark mode ${isDarkMode ? 'enabled' : 'disabled'}.`);
});
