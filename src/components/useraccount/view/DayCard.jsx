import React, { useState } from 'react'

export default function DayCard({workout, rep, set, weight, isLast}) {

    const [completed, setCompleted] = useState(false);

    const handleComplete = () => {
        setCompleted(!completed);
    };
    

    return (
        <div className={`flex flex-col ${!isLast ? 'border-b border-zinc-800' : ''}`}>
            {/* Main Workout Information Section */}
            <div className='flex flex-wrap pt-5 px-4 gap-4 items-center justify-between '>
                {/* Workout Details Group */}
                <div className='flex flex-col gap-2'>
                    {/* Workout Name */}
                    <h3 className='capitalize text-2xl font-semibold text-zinc-800'>
                        {workout}
                    </h3>

                    {/* Workout Specifications */}
                    <div className='flex flex-col gap-1 text-zinc-600'>
                        {/* Only show if set and rep values exist */}
                        {set && rep && (
                            <p className='text-lg'>
                                {set} {parseInt(set) === 1 ? 'Set' : 'Sets'} of{' '}
                                {rep} {parseInt(rep) === 1 ? 'Rep' : 'Reps'}
                            </p>
                        )}
                        
                        {/* Weight information */}
                        {weight && (
                            <p className='text-lg'>
                                Weight: {weight}
                            </p>
                        )}
                    </div>
                </div>

                {/* Completion Button */}
                <button 
                    onClick={handleComplete}
                    className={`
                        border-2 border-zinc-800
                        px-5 py-2
                        rounded
                        transition-all duration-300
                        ${completed 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-white text-zinc-800 hover:bg-zinc-100'
                        }
                    `}
                >
                    {completed ? 'Completed' : 'Start'}
                </button>

            </div>
            {/* Bottom Padding */}
            <div className='h-5'></div>
            {/* <div className='border border-zinc-800 w-full mt-5'></div> */}

        </div>
    )
}
