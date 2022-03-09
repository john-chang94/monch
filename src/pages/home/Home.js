import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import { useAuth } from '../../contexts/AuthContext';

export default function Home() {
    const { user } = useAuth();

    return (
        <div>
            HOME
            <Link to={ROUTES.SIGN_IN}>SIGN IN</Link>
            <br />
            {user && <p>{user.firstName}</p>}
        </div>
    )
}