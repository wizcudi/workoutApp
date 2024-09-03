import React from 'react'
import './Hero.css'
import Button from './Button.jsx'

export default function Hero(props) {
    return (
        <div className='hero'>
            <h1>Lets Create Your Workout</h1>
            <p>Click the button below to start</p>
            <Button onClick={props.onCreateWorkout}>
                Let's Begin
            </Button>
        </div>
    )
}
