import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut   } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useNavBarContext } from '../context/NavContext.jsx';
import Button from '../components/Button.jsx'


const SignOut = () => {
    const navigate = useNavigate();
    const {  setError, setSuccess, setIsOnDashboard } = useNavBarContext();


    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setSuccess(true);
            setError(null);
            setIsOnDashboard(false);
            navigate('/');  // Redirect to home page
        } catch (error) {
            setError(error.message);
            setSuccess(false);
        }
    }

    return (
        <div>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    )
};

export default SignOut;