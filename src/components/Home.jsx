import React, { useState,useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'

import './Home.css'
import Hero from './Hero.jsx'
import SignIn from '../auth/SignIn.jsx'
import SignUp from '../auth/SignUp.jsx'
import { useAuthContext } from '../context/AuthStateManager.jsx'

export default function Home() {
    // null by default, 'signIn' or 'signUp' based on action
    const [authMode, setAuthMode] = useState(null) 
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    
    // type can be 'signIn' or 'signUp'
    const handleAuth = (type) => {
        setAuthMode(type) 
    }

    return (
        <div className='homebody'>
            {authMode === 'signIn' ? (
                <SignIn />
            ) : authMode === 'signUp' ? (
                <SignUp />
            ) : (
                <Hero 
                    onHandleAuth={handleAuth}
                />
            )}
        </div>
    )
}
