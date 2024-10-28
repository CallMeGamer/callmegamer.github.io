// SignIn.js
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch((error) => console.error('Error signing in:', error));
    };

    return (
        <div className="sign-in-container">
            <h1>Welcome to CallMeGamer GameHub</h1>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}

export default SignIn;
