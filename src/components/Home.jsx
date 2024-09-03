import React from 'react'
import { useState } from 'react'
import WorkoutModal from './WorkoutModal.jsx'
import Hero from './Hero.jsx'

import './Home.css'


export default function Home() {
    const [showForm, setShowForm] = useState(false)

    const showFormHandler = () => {
        setShowForm(true)
    }

    
    return (
        <div className='homebody'>
            
            {showForm ? <WorkoutModal /> : <Hero onCreateWorkout={showFormHandler} />}

        </div>
    )
}
