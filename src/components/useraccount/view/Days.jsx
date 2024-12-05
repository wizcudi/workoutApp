import React from 'react'
import Day from './Day'

export default function Days({ days }) {

    

    return (
        <div className='flex flex-col gap-4 px-4 py-6'>
            {days.map((day) => (
                <Day 
                    key={day.id}
                    day={`Day ${day.id}`}
                    workouts={day.workouts} // Pass the entire workouts array
                    
                />
            ))}
        </div>
    )
}
