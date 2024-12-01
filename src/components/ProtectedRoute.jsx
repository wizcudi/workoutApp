import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export default function ProtectedRoute({ children }) {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>; // Or your custom loading component
    }

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return children;
}
