import React, { useState } from 'react'
import { useWorkout } from '../../context/WorkoutContext';

export default function DayCard({workout, rep, set, weight, isLast, workoutId}) {

    const [completed, setCompleted] = useState(false);

    const [selectedWeek, setSelectedWeek] = useState(0);
    const { progressiveOverload } = useWorkout();

    const handleComplete = () => {
        setCompleted(!completed);
    };

    const workoutProgression = progressiveOverload.enabled && 
        progressiveOverload.progressions[workoutId];
    

    return (
        <div className={`flex flex-col ${!isLast ? 'border-b border-color-30' : ''}`}>
            {/* Main Workout Information Section */}
            <div className='flex flex-wrap max-400:flex-col max-400:items-start  pt-5 px-4 gap-6  justify-between '>
                {/* Workout Details Group */}
                <div className='flex flex-col gap-2 text-color-30'>
                    
                    {/* Workout Name */}
                    <h3 className='capitalize text-2xl font-semibold '>
                        {workout}
                    </h3>

                    {/* Workout Specifications */}
                    <div className='flex flex-col gap-1'>
                        {/* Only show if set and rep values exist */}
                        {set && rep && (
                            <p className='text-lg'>
                                {set} {parseInt(set) === 1 ? 'Set' : 'Sets'} of{' '}
                                {rep} {parseInt(rep) === 1 ? 'Rep' : 'Reps'}
                            </p>
                        )}
                        

                        {/* Progressive Weight Display */}
                        {workoutProgression ? (
                            <div className='flex flex-col gap-2'>
                                <select 
                                    value={selectedWeek}
                                    onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                                    className="p-1 border border-color-30 rounded"
                                >
                                    <option value={0}>Base Weight: {weight}lbs</option>
                                    {Object.entries(workoutProgression.weeklyWeights).map(([week, weight]) => (
                                        <option key={week} value={week}>
                                            Week {week}: {weight}lbs
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            weight && <p className='text-lg'>Weight: {weight}lbs</p>
                        )}


                    </div>
                </div>

                {/* Completion Button */}
                <div>
                <button 
                    onClick={handleComplete}
                    className={`
                        border-2 border-zinc-800
                        px-5 py-2
                        rounded
                        transition-all duration-300
                        max-400:w-full
                        font-semibold
                         

                        ${completed 
                            ? 'bg-color-10-a text-color-30' 
                            : 'bg-color-30 text-color-10-a border border-color-10-a'
                        }
                    `}
                >
                    {completed ? 'Completed' : 'Start'}
                </button>
                </div>

            </div>
            {/* Bottom Padding */}
            <div className='h-5'></div>
            {/* <div className='border border-zinc-800 w-full mt-5'></div> */}

        </div>
    );
}
