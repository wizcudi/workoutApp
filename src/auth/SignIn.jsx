import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import { useAuthContext } from '../context/AuthStateManager.jsx'

import Button from '../components/Button.jsx'
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setSuccess(userCredential.user);
            setError(null);
            setEmail('');
            setPassword('');
            navigate('/dashboard');
        } catch (error) {
            setError(error.message)
            setSuccess(false);
        }
    }

    if (user) {
        navigate('/dashboard');
        return null;
    }

    return (
        <form className="flex flex-col p-8 gap-5" onSubmit={handleSignIn}>
            <h2 className="text-2xl text-center capitalize">
                Sign In to your account
            </h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="h-10 px-3 border border-gray-300 rounded"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="h-10 px-3 border border-gray-300 rounded"
            />
            <Button type="submit">Sign In</Button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Successfully signed in!</p>}
        </form>
    )
};

export default SignIn;