import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { signIn } = useAuth();

    return (
        <div>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => signIn(email, password)}>Sign In</button>
        </div>
    )
}