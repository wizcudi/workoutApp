import React from 'react'
import Button from './Button.jsx'


export default function CreatedWorkout({todaysRegimen, regimenName, setRegimenName, onSubmitRegimen}) {
    
    return (
        <div className='flex flex-col gap-5 p-5'>
            {todaysRegimen.map(workout => (
                <ul key={workout.id} className="m-0">
                    <li className="text-lg">{workout.workoutName}</li>
                    <li className="text-lg">{workout.workoutWeight} LBs</li>
                    <li className="text-lg">{workout.workoutRep} Reps</li>
                </ul>                    
            ))}

            <input 
                type='text'
                value={regimenName}
                onChange={(e) => setRegimenName(e.target.value)}
                placeholder='Enter a name'
                className="h-8 px-2 border border-gray-300 rounded-md"
            />
            <Button onClick={onSubmitRegimen} >Workout Name</Button>
        </div>
    )
}
