import React from 'react'
import Button from './Button.jsx'


export default function Hero(props) {
    return (
        <div className="flex flex-col gap-8 p-10">
            <h1 className="text-center text-5xl">Workout Tracker</h1>
            <p className="text-center text-2xl">
                No more notes app or pocket books.
                Create your custom workout regimen 
                and store it in the cloud.
            </p>
            <Button onClick={() => props.onHandleAuth('signIn')}>
                Sign In
            </Button>
            <Button onClick={() => props.onHandleAuth('signUp')}>
                Sign Up
            </Button>
        
        </div>
    )
}
