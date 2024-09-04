import React from 'react'
import './SubmittedRegimens.css'

export default function SubmittedRegimens ({confirmedRegimen}) {
    return (
        <div className='submitted-regimen'>
            <h2 className='submitted-regimen-title'>Regimen List</h2>
            {Object.entries(confirmedRegimen).map(([name,workouts]) => (
                <div className='regimen-entries' key={name}>
                    <h2 className='regimen-entrie-title'>{name}</h2>
                    {workouts.map(workout => (
                        <ul className='regimen-entrie-title-ul' key={workout.id}>
                            <li>{workout.workoutName}</li>
                            <li>{workout.workoutWeight}</li>
                            <li>{workout.workoutRep}</li>
                        </ul>
                    ))}
                </div>
            ))}
        </div>
    )
}
