// Dashboard.js
import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';

function Dashboard({ user }) {
    const [currency, setCurrency] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const userId = user.uid;
        get(ref(db, `users/${userId}/currency`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setCurrency(snapshot.val());
                } else {
                    setCurrency(100); // Default currency
                }
            })
            .catch((error) => console.error('Error fetching currency:', error));
    }, [user]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSignOut = () => {
        signOut(auth).catch((error) => console.error('Error signing out:', error));
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <h1>Welcome, {user.displayName}</h1>
            <p>Email: {user.email}</p>
            <p>Currency: {currency}</p>

            <button onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default Dashboard;
