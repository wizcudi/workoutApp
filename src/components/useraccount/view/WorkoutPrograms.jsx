import React, { useEffect } from 'react'
import ProgramCard from './ProgramCard'
import { useWorkout } from '../../WorkoutContext'

export default function WorkoutPrograms() {

    const { 
        savedWorkouts, 
        fetchWorkouts, 
        isLoading, 
        error 
    } = useWorkout();
    
    useEffect(() => {
        fetchWorkouts();
    }, []);

    if (isLoading) {
        return <div className="py-12">Loading...</div>;
    }

    if (error) {
        return <div className="py-12 text-red-500">{error}</div>;
    }

    return (
        <div className='
            w-full max-w-2xl
            flex flex-col gap-8 py-12
            text-color-30
        '>
            <h1 className="text-4xl font-semibold border-b-2 border-color-30 pb-2">
                View Program
            </h1>

            {savedWorkouts.length === 0 ? (
                <p>No workout programs found.</p>
            ) : (
                <div className='flex flex-col gap-4'>
                    {savedWorkouts.map((program) => (
                        <ProgramCard 
                            key={program.id}
                            header={program.name}
                            cardBG="bg-color-30"
                            program={program}
                        />
                    ))}
                </div>
            )}

        </div>
    )
}
