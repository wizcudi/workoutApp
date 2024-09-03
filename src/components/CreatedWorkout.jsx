import React, {useState} from 'react'
import './CreatedWorkout.css'
import Button from './Button.jsx'

export default function CreatedWorkout({todaysRegimen, regimenName, setRegimenName, onSubmitRegimen}) {

    

    return (
        <div>
            {todaysRegimen.map(workout => (
                <ul key={workout.id}>
                    <li>{workout.workoutName}</li>
                    <li>{workout.workoutWeight}</li>
                    <li>{workout.workoutRep}</li>
                </ul>                    
            ))}

            <input 
                type='text'
                value={regimenName}
                onChange={(e) => setRegimenName(e.target.value)}
                placeholder='Enter a name'
            />
            <Button onClick={onSubmitRegimen} >Workout Name</Button>
        </div>
    )
}
