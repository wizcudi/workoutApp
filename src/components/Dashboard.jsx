import React, { useEffect } from 'react';
import { useNavBarContext } from '../context/NavContext.jsx';
import { Link } from 'react-router-dom';
import './Dashboard.css'

export default function Dashboard() {
    const { setIsOnDashboard } = useNavBarContext();

    useEffect(() => {
        setIsOnDashboard(true);
        return () => setIsOnDashboard(false);
    }, [setIsOnDashboard]);

    

    return (
        <div className='dashboard'>

            <div className='dash-body'>
                <h1>Welcome Back</h1>
                <Link to="/view-workout" className='dash-offers'>
                    <h2>View Workouts</h2>
                </Link>
                <Link to="/create-workout" className='dash-offers'>
                    <h2>Create Workout</h2>
                </Link>
            </div>
        
        </div>
    );
}
