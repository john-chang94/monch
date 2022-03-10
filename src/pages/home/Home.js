import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Home() {
    const { activeUser } = useAuth();

    return (
        <div>
            HOME
            <br />
            {activeUser && <p>{activeUser.email}</p>}
        </div>
    )
}