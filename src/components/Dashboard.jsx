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

            <div 
                className='
                    flex 
                    flex-col 
                    items-center 
                    justify-evenly 
                    gap-5 

                    p-5
                    
                '
            >
                <h1
                    className='
                        text-4xl 
                        font-bold
                    '
                >Welcome Back</h1>
                <Link 
                    to="/view-workout" 
                    className='
                        rounded
                        flex 
                        items-center 
                        justify-center 
                        w-4/5 
                        h-24 
                        cursor-pointer
                        text-xl
                        font-semibold
                        
                        border-2 
                        border-black 
                        hover:bg-blue-800
                        hover:text-white
                        hover:border-none
                    '
                >
                    <h2>View Workouts</h2>
                </Link>
                <Link 
                    to="/create-workout" 
                    className='
                        
                        rounded
                        flex 
                        items-center 
                        justify-center 
                        w-4/5 
                        h-24 
                        cursor-pointer
                        text-xl
                        font-semibold
                        
                        border-2 
                        border-black 
                        hover:bg-blue-800
                        hover:text-white
                        hover:border-none
                    '
                >
                    <h2>Create Workout</h2>
                </Link>
            </div>
        
        </div>
    );
}
