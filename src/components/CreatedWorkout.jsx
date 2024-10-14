import React from 'react'
import Button from './Button.jsx'

import { useNavBarContext } from '../context/NavContext.jsx'


export default function CreatedWorkout({todaysRegimen, regimenName, setRegimenName, onSubmitRegimen}) {
    
    const {
        showCreatedWorkout,
        setShowCreatedWorkout
    } = useNavBarContext();

    return (
        <div className='
            flex 
            flex-col 
            gap-8
        '>


            <button 
                onClick={() => setShowCreatedWorkout(!showCreatedWorkout)}
                className='
                    border-2 
                    border-black
                    w-10
                    h-10
                    rounded
                    flex
                    text-2xl
                    font-bold
                    justify-center
                    items-center
                    cursor-pointer
                    hover:bg-black
                    hover:text-white
                    shadow-lg
                '
            >
                X
            </button>

            <input 
                type='text'
                value={regimenName}
                onChange={(e) => setRegimenName(e.target.value)}
                placeholder='Enter a name'
                className="h-8 px-2 border border-gray-300 rounded-md"
            />

            {todaysRegimen.map(workout => (
                <ul key={workout.id} className="">
                    <li className="text-lg">{workout.workoutName}</li>
                    <li className="text-lg">{workout.workoutWeight} LBs</li>
                    <li className="text-lg">{workout.workoutRep} Reps</li>
                </ul>                    
            ))}

            
            <Button onClick={onSubmitRegimen} >Workout Name</Button>
        </div>
    )
}
