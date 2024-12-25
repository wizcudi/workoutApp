import React, { useState } from 'react'
import DayCard from './DayCard'

export default function Day({day, workouts}) {
    
    const [isExpanded, setIsExpanded] = useState();

    const handleDayClick = () => {
        setIsExpanded(!isExpanded);
    };
    

    return (
        <div className=' rounded '>
            <div
                onClick={handleDayClick}
                className="
                    cursor-pointer px-2 py-2 rounded
                    bg-color-30 hover:bg-color-30/75
                "
            >
                <h2 
                    className='text-2xl text-color-10-b font-semibold '
                >
                    {day}
                </h2>
            </div>
            

            <div className={`${isExpanded ? 'flex' : 'hidden'} flex-col `}>
                {workouts.map((workout, index) => (
                    <DayCard 
                        key={workout.id}
                        workout={workout.workoutName}
                        rep={workout.reps}
                        set={workout.sets}
                        weight={workout.weight}
                        isLast={index === workouts.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}
