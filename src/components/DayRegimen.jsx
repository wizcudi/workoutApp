import React, { useState } from 'react'
import { useNavBarContext } from '../context/NavContext.jsx'

import DayForm from './DayForm.jsx';
import CreatedWorkout from './CreatedWorkout.jsx';
import SubmittedRegimens from './SubmittedRegimens.jsx'

import { db } from '../firebase';  // Import Firebase
import { doc, setDoc } from 'firebase/firestore';  // Import Firestore functions
import { useAuthContext } from '../context/AuthStateManager.jsx'



export default function DayRegimen() {
    const {
        todaysRegimen,
        setTodaysRegimen,
        showCreatedWorkout,
        showSubmittedRegimens,
    } = useNavBarContext();


    const [regimenName, setRegimenName] = useState('')
    const [confirmedRegimen, setConfirmedRegimen] = useState({})
    const { user, loading, username  } = useAuthContext(); 

    // Function to add new workout
    const addWorkout = (currentWorkout) => {
        setTodaysRegimen(prevRegimen => [
            ...prevRegimen, 
            { ...currentWorkout, id: Date.now() }
        ]);
    };


    // submits list created to one finalized list
    const saveWorkoutToFirebase = async () => {
        if (!user) {
            throw new Error("User not authenticated");
        }

        if (!username) {
            throw new Error("Username not found");
        }

        // Combine all workouts into a single object
        const combinedWorkouts = {
            email: user.email,
            username: username,
            createdAt: new Date(),

            // CREATE A NAME FUNCTIONALITY FOR EACH SAVED REGIMEN
            workouts: Object.entries(confirmedRegimen).map(([name, workouts]) => ({
                name, 
                regimen: workouts
            }))
        };
    
        try {
            // Use setDoc with username as document ID
            const workoutRef = doc(db, 'workouts', username);
            await setDoc(workoutRef, combinedWorkouts);
            console.log("Document written for username: ", username);


            // Clear the form after successful save
            setConfirmedRegimen({});
            setTodaysRegimen([]);
            setRegimenName('');


            return 1; // We're saving one document, so return 1
        } catch (error) {
            console.error("Error adding document: ", error);
            throw error;
        }
    };

    // This function now only updates local state
    const submitRegimen = () => {
        if (regimenName && todaysRegimen.length > 0) {
            setConfirmedRegimen(prevList => ({
                ...prevList,
                [regimenName]: todaysRegimen
            }));
            setTodaysRegimen([]);
            setRegimenName('');
        } else {
            alert('Please name today\'s regimen and add at least one workout.');
        }
    };
   
    if (loading) return <div>Loading...</div>;  // Show loading if still waiting for auth
    
    return (
        <div className="relative p-10 w-full max-w-lg">
            <DayForm onAddWorkout={addWorkout} />
           

            {showCreatedWorkout && (
                <div className="fixed top-20 right-5 bg-white p-5 rounded-lg shadow-lg max-w-sm max-h-[80vh] overflow-y-auto">
                    <CreatedWorkout 
                        todaysRegimen={todaysRegimen}
                        regimenName={regimenName}
                        setRegimenName={setRegimenName}
                        onSubmitRegimen={submitRegimen} 
                    />
                </div>
            )}
            
            {showSubmittedRegimens && (
                <div className="fixed top-20 right-5 bg-white p-5 rounded-lg shadow-lg max-w-sm max-h-[80vh] overflow-y-auto">
                    <SubmittedRegimens 
                        confirmedRegimen={confirmedRegimen} 
                        onSaveWorkout={saveWorkoutToFirebase}
                    />
                </div>
            )}
            
        </div>
    )
}



