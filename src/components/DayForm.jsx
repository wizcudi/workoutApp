import React, { useState }  from 'react'
import './DayForm.css' 
import Button from './Button.jsx'

export default function DayForm({onAddWorkout}) {

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
        <form className='createForm' onSubmit={submitWorkout}>
                <label >
                    Workout 
                </label>
                <input 
                        value={currentWorkout.workoutName}
                        onChange={handleInputChange} 
                        name='workoutName'  
                    />
                <br></br>
                <label >
                    Weight 
                    
                </label>
                <input
                        value={currentWorkout.workoutWeight}
                        onChange={handleInputChange} 
                        name='workoutWeight'  
                    />
                <br></br>
                <label >
                    Rep
                    
                </label>
                <input 
                        value={currentWorkout.workoutRep}
                        onChange={handleInputChange} 
                        name='workoutRep'  
                    />
                <br></br>
                <Button type='submit'>Submit</Button>
        </form>
  )
}
