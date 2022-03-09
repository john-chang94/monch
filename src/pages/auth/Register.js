import React from 'react';
import { register } from '../../services';

export default function Register() {
    return (
        <form>
            <input type="text" />
            <input type="text" />
            <input type="email" />
            <input type="password" />
            <input type="password" />
            <button>Register</button>
        </form>
    )
}