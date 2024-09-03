import React from 'react'
import './SubmittedRegimens.css'

export default function SubmittedRegimens ({confirmedRegimen}) {
    return (
        <div>
            <h2>Submitted Regimen List</h2>
            {Object.entries(confirmedRegimen).map(([name,workouts]) => (
                <div key={name}>
                    <h2>{name}</h2>
                    {workouts.map(workout => (
                        <ul key={workout.id}>
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
