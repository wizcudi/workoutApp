import React from 'react'
import Button from './premade/Button'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div 
            className='
                max-w-3xl
                flex
                flex-col
                justify-center
                items-center
                md:p-10
                p-7
                gap-6
                rounded
                
            '
        >
            <h1
                className='
                    text-6xl
                '
            >
                Fit Tracker
            </h1>
            <p 
                className='
                    text-2xl
                    text-center
                '
            >
                No more notes app or pocket books. 
                Create your custom workouts and track your progress. 
                While storing it all in the cloud.
            </p>
            <div
                className='
                    flex
                    flex-col
                    justify-center
                    gap-3
                    mt-2
                    w-full
                    sm:w-4/6
                '
            >

                <Link to="/signup">
                    <Button 
                        btnText='Create an account'
                        btnBorder='border-2 border-teal-700'
                        hoverColor='hover:bg-white'
                        hoverText='hover:text-teal-700'
                        btnTextStyle='text-white font-bold text-xl uppercase'
                        bgColor='bg-teal-700'
                        activeColor='active:text-white active:bg-teal-600 active:border-none'
                    />
                </Link>

                <Link to="/signin">
                    <Button 
                        btnText='Welcome Back'
                        btnBorder='border-2 border-teal-700'
                        hoverColor='hover:bg-white'
                        hoverText='hover:text-teal-700'
                        btnTextStyle='text-white font-bold text-xl uppercase'
                        bgColor='bg-teal-700'
                        activeColor='active:text-white active:bg-teal-600 active:border-none'
                    />
                </Link>

            </div>
        </div>
    )
}
