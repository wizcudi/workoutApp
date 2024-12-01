import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase'
import SignOut from './SignOut';

export default function Navbar() {
    const [user] = useAuthState(auth);

    return (
        <nav className="
            p-4 bg-teal-700 text-white text-lg
        ">
            <div className="
                max-w-4xl mx-auto 
                flex items-center justify-between gap-7
            ">
                <Link 
                    to="/" 
                    className="
                        
                    "
                >
                    Home
                </Link>

                <div>
                    { user && 
                        (
                            <div className='flex gap-4 items-center'>
                                <Link
                                    to="/dashboard"
                                >
                                    Dashboard
                                </Link>

                                <SignOut />
                            </div>
                        ) 
                    }
                </div>
                
            </div>
        </nav>
    )
}