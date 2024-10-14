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
                    `flex items-center  gap-7 ${
                        hamburgerClicked ? 
                        'flex-col justify-center gap-16 text-lg bg-stone-300 shadow-2xl fixed top-0 left-0 h-screen z-50 w-3/5' 
                        : 
                        'hidden md:flex'
                    }`
                }

                
            >
                {hamburgerClicked && (
                    <div 
                        className="
                            absolute 
                            top-5 
                            right-5 
                            border-2 
                            border-black
                            rounded-full
                            text-2xl

                            w-10
                            h-10
                            flex
                            justify-center
                            items-center
                            cursor-pointer

                            hover:bg-blue-600
                            hover:border-none
                            hover:text-white
                        " 
                        onClick={toggleHamburgerMenu}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                )}
                <Link to="/dashboard" className='font-bold text-lg'>Dashboard</Link>
                <Link to="/view-workout" className='font-bold text-lg'>View Workout</Link>
                <Link to="/create-workout" className='font-bold text-lg'>Create Workout</Link>
                
                {/* Add sign in / sign out functionalitty  */}
                <SignOut />


            </div>

            <div onClick={toggleHamburgerMenu} className="block md:hidden cursor-pointer">
                <FontAwesomeIcon icon={faBars} />
            </div>
            
        </div>
    )
}
