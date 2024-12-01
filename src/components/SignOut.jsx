import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function SignOut() {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <button
            className="
                bg-blue-500 hover:bg-blue-700 
                text-white font-bold 
                py-2 px-4 rounded
            "
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    )
}
