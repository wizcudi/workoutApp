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
                className="text-4xl font-semibold mx-auto text-center py-4 bg-gray-300 cursor-pointer"
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
