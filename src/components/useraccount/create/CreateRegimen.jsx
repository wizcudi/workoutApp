import React, { useState, useEffect } from 'react'
import CreateRegimenDay from './CreateRegimenDay'
import ProgressiveOverload from './presets/progressive/ProgressiveOverload';
import { useWorkout } from '../../context/WorkoutContext';

function CreateRegimenContent () {
    const [programName, setProgramName] = useState("");
    const { 
        saveWorkout, 
        clearError,
        error,
        isLoading
    } = useWorkout();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          await saveWorkout(programName);
          setProgramName("");
          alert("Workout program saved successfully!");
        } catch (error) {
          alert(error.code === 'permission-denied' 
            ? "You don't have permission to save workouts" 
            : "Error saving workout program. Please try again."
          );
        }
    };
    
    useEffect(() => {
        return () => {
            clearError();
        };
    }, []);


    return (
            <div className=" w-full max-w-3xl flex flex-col py-12  gap-12 text-color-30">
                <h1 className="text-4xl text-center font-bold capitalize ">
                    Create your workout
                </h1>

                <ProgressiveOverload />

                <div className='flex flex-col gap-8 border-2 border-color-30 p-6'>
                    <div className="flex flex-col gap-1">
                        <label className="text-xl font-semibold">Program Name:</label>
                        <input
                            type="text"
                            value={programName}
                            onChange={(e) => setProgramName(e.target.value)}
                            className="text-lg bg-color-60 caret-color-10-a outline-none border-b-2 border-color-30 focus:border-color-30 transition-colors px-2"
                            placeholder="Enter program name"
                        />
                    </div>
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                    <CreateRegimenDay />
                </div>
                
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="
                        w-full border-2 border-color-30 bg-color-30
                        text-color-10-b text-lg font-semibold max-w-[300px] w-full
                        hover:bg-color-10-a hover:text-color-30
                        transition-colors px-4 py-2 rounded-md mx-auto
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                >
                    {isLoading ? 'Saving...' : 'Create Workout'}
                </button>

            </div>
        
    )
}

export default function CreateRegimen() {
    return (
        <CreateRegimenContent  />
    );
}