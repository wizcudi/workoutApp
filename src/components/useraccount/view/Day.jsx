import React, { useState } from 'react'
import DayCard from './DayCard'

export default function Day({day, workouts}) {
    
    const [isExpanded, setIsExpanded] = useState();

    const handleDayClick = () => {
        setIsExpanded(!isExpanded);
    };
    

    return (
        <div>
            <h2 
                onClick={handleDayClick}
                className="
                    text-4xl text-color-10-b font-semibold mx-auto 
                    text-center py-4 cursor-pointer
                    bg-color-30 hover:bg-color-30/75
                "
            >
                {day}
            </h2>

            <div className={`${isExpanded ? 'flex' : 'hidden'} flex-col`}>
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
