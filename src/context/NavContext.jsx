import React, { createContext, useState, useContext } from 'react';

// Create a context
const NavBarContext = createContext();

// Create a provider component
export const NavBarProvider = ({ children }) => {
    const [showIcons, setShowIcons] = useState(false);
    const [todaysRegimen, setTodaysRegimen] = useState([]);
    const [showCreatedWorkout, setShowCreatedWorkout] = useState(false);
    const [showSubmittedRegimens, setShowSubmittedRegimens] = useState(false);


    return (
        <NavBarContext.Provider value={{ 
            showIcons, 
            setShowIcons, 
            todaysRegimen,
            setTodaysRegimen,
            showCreatedWorkout,
            setShowCreatedWorkout,
            showSubmittedRegimens,
            setShowSubmittedRegimens 

        }}>
            {children}
        </NavBarContext.Provider>
    );
};

// Custom hook to use the NavBarContext
export const useNavBarContext = () => useContext(NavBarContext);
