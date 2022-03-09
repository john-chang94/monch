import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

import * as ROUTES from "../../constants/routes";

export default function Account() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth);
        navigate(ROUTES.HOME);
    }
    
    return (
        <div>
            USER ACCOUNT
            <button onClick={handleSignOut}>SIGN OUT</button>
        </div>
    )
}