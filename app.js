// App.js
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import Dashboard from './Dashboard';
import SignIn from './SignIn';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="App">
            {user ? <Dashboard user={user} /> : <SignIn />}
        </div>
    );
}

export default App;
