import React, {useState, useEffect } from 'react'
import { useNavBarContext } from '../context/NavContext.jsx'
import './DayRegimen.css'
import DayForm from './DayForm.jsx';
import CreatedWorkout from './CreatedWorkout.jsx';
import SubmittedRegimens from './SubmittedRegimens.jsx'
import { db } from '../firebase';  // Import Firebase
import { collection, addDoc } from 'firebase/firestore';  // Import Firestore functions
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

        // Combine all workouts into a single object
        const combinedWorkouts = {
            email: user.email,
            createdAt: new Date(),

            // CREATE A NAME FUNCTIONALITY FOR EACH SAVED REGIMEN
            workouts: Object.entries(confirmedRegimen).map(([name, workouts]) => ({
                name, 
                regimen: workouts
            }))
        };
    
        try {
            // Save the combined workouts as a single document
            // User's UID as the collection name
            const docRef = await addDoc(collection(db, username), combinedWorkouts); 
            // const docRef = await addDoc(collection(db, 'workouts'), combinedWorkouts);
            console.log("Document written with ID: ", docRef.id);

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
        <div className="day-regimen">
            <DayForm onAddWorkout={addWorkout} />
           

            {showCreatedWorkout && (
                <div className="popup-container">
                    <CreatedWorkout 
                        todaysRegimen={todaysRegimen}
                        regimenName={regimenName}
                        setRegimenName={setRegimenName}
                        onSubmitRegimen={submitRegimen} 
                    />
                </div>
            )}
            
            {showSubmittedRegimens && (
                <div className="popup-container">
                    <SubmittedRegimens 
                        confirmedRegimen={confirmedRegimen} 
                        onSaveWorkout={saveWorkoutToFirebase}
                    />
                </div>
            )}
            
        </div>
    )
}



