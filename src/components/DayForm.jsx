import React, { useState }  from 'react'
import Button from './Button.jsx'

import { useNavBarContext } from '../context/NavContext.jsx'
import { Clipboard, List } from 'lucide-react';

export default function DayForm({onAddWorkout}) {

    const {
        // showIcons,
        todaysRegimen,
        showCreatedWorkout,
        setShowCreatedWorkout,
        showSubmittedRegimens,
        setShowSubmittedRegimens,
    } = useNavBarContext();
   
    const [currentWorkout, setCurrentWorkout] = useState({
        workoutName: '',
        workoutWeight: '',
        workoutRep: ''
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target 

        setCurrentWorkout(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitWorkout = (e) => {
        e.preventDefault()

        // used for testing
        // console.log(currentWorkout)

        onAddWorkout(currentWorkout)

        setCurrentWorkout({
            workoutName: '',
            workoutWeight: '',
            workoutRep: ''
        })
    }

    return (
        <div className="
            flex 
            flex-col 
            gap-10
        ">

            <div className="
                flex 
                gap-10 
                justify-start
            ">
                <button 
                        className="
                            flex 
                            items-center 
                            justify-center 
                            w-12
                            h-12
                            rounded
                            shadow-md 
                            cursor-pointer
                        "
                        onClick={() => setShowCreatedWorkout(!showCreatedWorkout)}
                    >
                        <Clipboard />
                        {todaysRegimen.length > 0 && (
                            <span className="badge">
                                {todaysRegimen.length}
                            </span>
                        )}
                </button>

                <button 
                        className="
                            flex 
                            items-center 
                            justify-center 
                            w-12
                            h-12
                            rounded
                            shadow-md 
                            cursor-pointer
                        "
                        onClick={() => setShowSubmittedRegimens(!showSubmittedRegimens)}
                    >
                        <List />
                </button>
            </div>

            {/* {showIcons && (
                <div className="flex gap-10 justify-center">
                    <button 
                        className="flex items-center justify-center w-10 h-10 rounded-full shadow-md cursor-pointer"
                        onClick={() => setShowCreatedWorkout(!showCreatedWorkout)}
                    >
                        <Clipboard />
                        {todaysRegimen.length > 0 && (
                            <span className="badge">
                                {todaysRegimen.length}
                            </span>
                        )}
                    </button>

                    <button 
                        className="flex items-center justify-center w-10 h-10 rounded-full shadow-md cursor-pointer"
                        onClick={() => setShowSubmittedRegimens(!showSubmittedRegimens)}
                    >
                        <List />
                    </button>
                </div>
            )} */}

            <form className="flex flex-col w-full gap-4" onSubmit={submitWorkout}>

                <label className="text-lg mb-1">
                    Workout
                </label>
                <input 
                    value={currentWorkout.workoutName}
                    onChange={handleInputChange} 
                    name='workoutName'  
                    className="h-8 p-2 border border-gray-300 rounded"
                />
                <br></br>
                <label className="text-lg mb-1">
                    Weight                     
                </label>
                <input
                    value={currentWorkout.workoutWeight}
                    onChange={handleInputChange} 
                    name='workoutWeight'
                    className="h-8 p-2 border border-gray-300 rounded"
                />
                <br></br>
                <label className="text-lg mb-1">
                    Rep
                </label>
                <input 
                    value={currentWorkout.workoutRep}
                    onChange={handleInputChange} 
                    name='workoutRep'
                    className="h-8 p-2 border border-gray-300 rounded"
                />
                <br></br>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
        
    )
}
