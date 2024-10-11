import React, { useEffect } from 'react';
import { useNavBarContext } from '../context/NavContext.jsx';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { setIsOnDashboard } = useNavBarContext();

    useEffect(() => {
        setIsOnDashboard(true);
        return () => setIsOnDashboard(false);
    }, [setIsOnDashboard]);

    

    return (
        <div className='max-w-xl w-full mx-auto'>

            <div className='flex flex-col items-center justify-evenly gap-5 min-h-[300px]'>
                <h1>Welcome Back</h1>
                <Link to="/view-workout" className='border-2 border-black rounded-xl flex items-center justify-center w-4/5 h-24 cursor-pointer'>
                    <h2>View Workouts</h2>
                </Link>
                <Link to="/create-workout" className='border-2 border-black rounded-xl flex items-center justify-center w-4/5 h-24 cursor-pointer'>
                    <h2>Create Workout</h2>
                </Link>
            </div>
        
        </div>
    );
}
