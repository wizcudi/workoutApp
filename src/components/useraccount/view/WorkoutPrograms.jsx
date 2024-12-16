import React, { useEffect } from 'react';
import ProgramCard from './ProgramCard';
import { useWorkout } from '../../context/WorkoutContext';

export default function WorkoutPrograms() {
    const { savedWorkouts, fetchWorkouts, isLoading, error } = useWorkout();
    
    useEffect(() => {
        // Fetch workouts when component mounts
        fetchWorkouts();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full max-w-2xl py-12 text-color-30">
                <h1 className="text-4xl font-semibold border-b-2 border-color-30 pb-2">
                    View Programs
                </h1>
                <div className="py-8">Loading your workout programs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-2xl py-12">
                <h1 className="text-4xl font-semibold text-color-30 border-b-2 border-color-30 pb-2">
                    View Programs
                </h1>
                <div className="py-8 text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className='w-full max-w-2xl flex flex-col gap-8 py-12 text-color-30'>
            <h1 className="text-4xl font-semibold border-b-2 border-color-30 pb-2">
                View Programs
            </h1>

            {savedWorkouts.length === 0 ? (
                <div className="py-4">
                    <p>No workout programs found.</p>
                    <p className="mt-2 text-sm">
                        Create a new workout program to get started!
                    </p>
                </div>
            ) : (
                <div className='flex flex-col gap-6'>
                    {savedWorkouts.map((program) => (
                        <div key={program.id} className="flex flex-col gap-2">
                            <ProgramCard 
                                header={program.name}
                                cardBG="bg-color-30"
                                program={program}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}