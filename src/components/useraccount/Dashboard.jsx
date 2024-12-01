import React from 'react'
import Card from '../premade/Card'
import NewRegimen from '../../assets/newWorkout.png'
import WorkoutPlan from '../../assets/workoutPlan.png'
import CalTracker from '../../assets/calTracker.png'
import MealHistory from '../../assets/mealHistory.png'

export default function Dashboard() {
    return (
        <div className='
            mt-6 mb-6
            w-full max-w-3xl min-h-[90%]
            flex flex-col gap-8
        '>

            <h1 className='
                text-5xl font-semibold
                border-b-2 border-teal-800
                pb-2
            '>Dashboard</h1>

            <div className='
                flex sm:flex-row flex-col flex-wrap
                gap-y-6 sm:justify-between justify-center
            '>

                <Card 
                    img={NewRegimen}
                    header="Create a new Regimen"
                    cardBG="bg-green-600 hover:bg-green-500"
                    to="/create_regimen"
                />
                
                <Card 
                    img={WorkoutPlan}
                    header="My Workout Program" 
                    cardBG="bg-sky-600 hover:bg-sky-500"
                    to="/workout_programs"
                />

                <Card 
                    img={CalTracker}
                    header="Calorie Tracker" 
                    cardBG="bg-amber-600 hover:bg-amber-500"
                    to="/calorie_tracker"
                />

                <Card 
                    img={MealHistory}
                    header="Meal History" 
                    cardBG="bg-rose-600 hover:bg-rose-500"
                    to="/meal_history"
                />
            </div>
        </div>
    )
}
