import React, {useState} from 'react'
import { useNavBarContext } from '../context/NavContext.jsx'
import Button from './Button.jsx'

export default function SubmittedRegimens ({confirmedRegimen,onSaveWorkout}) {

    const {
        showSubmittedRegimens,
        setShowSubmittedRegimens,
    } = useNavBarContext();

    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('')


    const handleSaveWorkoutToDB = async () => {
        if (isSaving) return; // Prevent multiple calls while saving
        setIsSaving(true);
        // setError(null);
        setSaveStatus('');

        try {
            const savedCount = await onSaveWorkout();
            setSaveStatus(`Successfully saved ${savedCount} workout${savedCount !== 1 ? 's' : ''}!`);
        } catch (e) {
            console.error("Error saving workout: ", e);
            setSaveStatus("Failed to save workout. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="
            flex 
            flex-col 
            gap-8
        ">

            <button 
                onClick={() => setShowSubmittedRegimens(!showSubmittedRegimens)}
                className='
                    border-2 
                    border-black
                    w-10
                    h-10
                    rounded
                    flex
                    text-2xl
                    font-bold
                    justify-center
                    items-center
                    cursor-pointer
                    hover:bg-black
                    hover:text-white
                    shadow-lg
                '
            >
                X
            </button>

            <h2 className="text-2xl border-b-2 border-black">Regimen List</h2>
            {Object.entries(confirmedRegimen).map(([name,workouts]) => (
                <div key={name} className="flex flex-col gap-5">
                    <h2 className="text-lg capitalize">{name}</h2>
                    {workouts.map(workout => (
                        <ul key={workout.id} className="flex flex-col gap-2">
                            <li>{workout.workoutName}</li>
                            <li>{workout.workoutWeight}</li>
                            <li>{workout.workoutRep}</li>
                        </ul>
                    ))}
                </div>
            ))}

            {/* Add btn to save regimen to a DB */}

            <Button onClick={handleSaveWorkoutToDB} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Workout'}
            </Button>

            {saveStatus && (
                <p className={`mt-2 ${saveStatus.includes('Successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {saveStatus}
                </p>
            )}
        </div>
    );
}
