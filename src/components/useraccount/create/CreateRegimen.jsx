import React, { useState, useEffect } from 'react'
import CreateRegimenDay from './CreateRegimenDay'
import AdminBtn from '../../premade/AdminBtn';
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
            <div className=" w-full max-w-3xl space-y-8 py-12 text-color-30">
                <h1 className="text-4xl text-center font-bold capitalize ">
                    Create your workout
                </h1>

                <div className='space-y-2'>
                    <AdminBtn
                        onClick={handleSubmit}
                        disabled={isLoading}
                        btnText={isLoading ? 'Saving...' : 'Create Workout'}
                    />
                    <ProgressiveOverload />
                </div>

                <div className='space-y-4 '>
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
                

            </div>
        
    )
}

export default function CreateRegimen() {
    return (
        <CreateRegimenContent  />
    );
}