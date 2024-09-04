import React from 'react'
import './Hero.css'
import Button from './Button.jsx'

export default function Hero(props) {
    return (
        <div className='hero'>
            <h1>Workout Tracker</h1>
            <p>
                No more notes app or pocket books.
                Create your custom workout regimen 
                and store it in the cloud.
            </p>
            <Button onClick={props.onCreateWorkout}>
                Let's Begin
            </Button>
        </div>
    )
}
