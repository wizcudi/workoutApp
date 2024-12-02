import React, { useState, useEffect } from 'react'
import {db,auth} from '../../../firebase'
import {doc, setDoc} from 'firebase/firestore'
import CreateRegimenDay from './CreateRegimenDay'
import { useWorkout } from '../../WorkoutContext';

function CreateRegimenContent () {
    const [programName, setProgramName] = useState("");
    const { 
        workoutData, 
        clearWorkoutCreation, 
        clearError,
        error
    } = useWorkout();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) {
            alert("Please login to save your workout program");
            return;
        }

        if (!programName.trim()) {
            alert("Please enter a program name");
            return;
        }

        try {
            const userEmail = auth.currentUser.email;
            // Check if a program with this name already exists
            const programData = {
                name: programName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: userEmail,
                days: workoutData.days
            };


            
            await setDoc(doc(db, userEmail, programName), programData);

            clearWorkoutCreation(); // Reset the creation form
            clearError(); // Clear any lingering errors
            setProgramName(""); // Clear the program name input


            alert("Workout program saved successfully!");

        } catch (error) {
            console.error("Error saving workout:", error);
            if (error.code === 'permission-denied') {
                alert("You don't have permission to save workouts");
            } else {
                alert("Error saving workout program. Please try again.");
            }
        }
    };

    // Clear any errors when component unmounts
    useEffect(() => {
        return () => {
            clearError();
        };
    }, []);


    return (
            <div className="
                w-full max-w-3xl flex flex-col 
                py-12  gap-12 text-color-30
            ">
                <h1 className="text-4xl  font-semibold capitalize ">
                    Create your workout
                </h1>

                <div className='flex flex-col gap-8'>
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

                    <CreateRegimenDay />
                </div>
                
                <button
                    onClick={handleSubmit}
                    className="
                        w-full border-2 border-color-30 bg-color-10-a
                        text-color-30 text-lg font-semibold max-w-[300px] w-full
                        hover:bg-color-30 hover:text-color-10-a
                        transition-colors px-4 py-2 rounded-md mx-auto
                    "
                >
                    Create Workout
                </button>

            </div>
        
    )
}

export default function CreateRegimen() {
    return (
        <CreateRegimenContent  />
    );
}