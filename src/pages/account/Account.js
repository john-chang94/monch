import React from 'react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

export default function Account() {
    return (
        <div>
            USER ACCOUNT
            <button onClick={() => signOut(auth)}>SIGN OUT</button>
        </div>
    )
}