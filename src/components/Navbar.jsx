import React, {useState} from 'react'
import './Navbar.css'
import { useNavBarContext } from '../context/NavContext.jsx'
import { Clipboard, List } from 'lucide-react';
import SignOut from '../auth/SignOut.jsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Link  } from 'react-router-dom';

export default function Navbar() {
    const {
        showIcons,
        todaysRegimen,
        showCreatedWorkout,
        setShowCreatedWorkout,
        showSubmittedRegimens,
        setShowSubmittedRegimens,
        isOnDashboard,
    } = useNavBarContext();

    const [hamburgerClicked, setHamburgerClicked] = useState(false)
    
    const toggleHamburgerMenu = () => {
        setHamburgerClicked(!hamburgerClicked)
    }

    

    return (
        <div className='navbar'>
            Navbar

            <div className={`navbar-items ${hamburgerClicked ? 'show' : ''}`}>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/view-workout">View Workout</Link>
                <Link to="/create-workout">Create Workout</Link>

                {showIcons && (
                    <div className="icon-buttons">
                        <button 
                            className="icon-button"
                            onClick={() => setShowCreatedWorkout(!showCreatedWorkout)}
                        >
                            <Clipboard />
                            {todaysRegimen.length > 0 && (
                                <span className="icon-badge">
                                    {todaysRegimen.length}
                                </span>
                            )}
                        </button>

                        <button 
                            className="icon-button"
                            onClick={() => setShowSubmittedRegimens(!showSubmittedRegimens)}
                        >
                            <List />
                        </button>
                    </div>
                )}

                {isOnDashboard && <SignOut />}
            </div>

            <div onClick={toggleHamburgerMenu} className='hamburger'>
                <FontAwesomeIcon className='faBar' icon={faBars} />
            </div>
        </div>
    )
}
