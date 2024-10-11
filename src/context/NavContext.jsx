import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom'


const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [showIcons, setShowIcons] = useState(false);
    const [todaysRegimen, setTodaysRegimen] = useState([]);
    const [showCreatedWorkout, setShowCreatedWorkout] = useState(false);
    const [showSubmittedRegimens, setShowSubmittedRegimens] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isOnDashboard, setIsOnDashboard] = useState(false)

    const location = useLocation();

    useEffect(() => {
        // Update showIcons based on the current route
        setShowIcons(location.pathname === '/create-workout');
        setIsOnDashboard(location.pathname === '/dashboard');
    }, [location]);

    return (
        <NavBarContext.Provider value={{ 
            showIcons, 
            setShowIcons, 
            todaysRegimen,
            setTodaysRegimen,
            showCreatedWorkout,
            setShowCreatedWorkout,
            showSubmittedRegimens,
            setShowSubmittedRegimens,
            error, 
            setError,
            success, 
            setSuccess,
            isOnDashboard, 
            setIsOnDashboard,
        }}>
            {children}
        </NavBarContext.Provider>
    );
};

export const useNavBarContext = () => useContext(NavBarContext);
