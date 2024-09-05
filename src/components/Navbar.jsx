import React from 'react'
import './Navbar.css'
import { useNavBarContext } from '../context/NavContext.jsx'
import { Clipboard, List } from 'lucide-react';

export default function Navbar() {

    const {
        showIcons,
        todaysRegimen,
        showCreatedWorkout,
        setShowCreatedWorkout,
        showSubmittedRegimens,
        setShowSubmittedRegimens
    } = useNavBarContext();

    return (
        <div className='navbar'>
            Navbar

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
        </div>
    )
}
