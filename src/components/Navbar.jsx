import React, {useState} from 'react'
import SignOut from '../auth/SignOut.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark  } from '@fortawesome/free-solid-svg-icons';
import { Link  } from 'react-router-dom';

export default function Navbar() {

    const [hamburgerClicked, setHamburgerClicked] = useState(false)
    
    const toggleHamburgerMenu = () => {
        setHamburgerClicked(!hamburgerClicked)
    }

    return (
        <div className="flex items-center justify-between bg-stone-200 p-5 w-full border-b-2 border-black ">

            <h1
                className="text-xl font-bold"
            >Fit Tracker</h1>

            <div 
                className={
                    `flex items-center justify-between gap-5 ${
                        hamburgerClicked ? 
                        'flex-col bg-stone-300 shadow-2xl py-20 fixed top-0 left-0 h-screen z-50 w-3/5' 
                        : 
                        'hidden md:flex'
                    }`
                }

                
            >
                {hamburgerClicked && (
                    <div className="absolute top-5 right-5 cursor-pointer" onClick={toggleHamburgerMenu}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                )}
                <Link to="/dashboard" className='font-bold'>Dashboard</Link>
                <Link to="/view-workout" className='font-bold'>View Workout</Link>
                <Link to="/create-workout" className='font-bold'>Create Workout</Link>
                
                {/* Add sign in / sign out functionalitty  */}
                <SignOut />


            </div>

            <div onClick={toggleHamburgerMenu} className="block md:hidden cursor-pointer">
                <FontAwesomeIcon icon={faBars} />
            </div>
            
        </div>
    )
}
