import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from '../components/premade/Form'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleSignIn = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
            throw error; // Propagate error to Form component
        }
    };

    return (
        <Form 
            heading="Sign In" 
            buttonText="Sign In" 
            onSubmit={handleSignIn} 
        />
    )
}
