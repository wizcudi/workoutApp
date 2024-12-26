import React from 'react'
import Button from './premade/Button'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='
            max-w-xl flex flex-col items-center 
            py-16 gap-8 rounded text-color-30
        '>
            <h1 className='
                text-6xl font-semibold
            '>
                Fit Tracker
            </h1>
            <p className='text-xl md:text-2xl text-center '>
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
                        btnBorder='border-2 border-color-30'
                        hoverColor='hover:bg-color-10-a'
                        hoverText='hover:text-color-30'
                        btnTextStyle='text-color-60 font-bold text-xl uppercase'
                        bgColor='bg-color-30'
                        activeColor='active:text-color-60 active:bg-color-10-a active:border-none'
                    />
                </Link>

                <Link to="/signin">
                    <Button 
                        btnText='Welcome Back'
                        btnBorder='border-2 border-color-30'
                        hoverColor='hover:bg-color-10-a'
                        hoverText='hover:text-color-30'
                        btnTextStyle='text-color-60 font-bold text-xl uppercase'
                        bgColor='bg-color-30'
                        activeColor='active:text-color-60 active:bg-color-10-a active:border-none'
                    />
                </Link>

            </div>
        </div>
    )
}
