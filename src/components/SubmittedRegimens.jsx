import React, {useState} from 'react'
import './SubmittedRegimens.css'

export default function SubmittedRegimens ({confirmedRegimen,onSaveWorkout}) {
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
        <div className='submitted-regimen'>
            <h2 className='submitted-regimen-title'>Regimen List</h2>
            {Object.entries(confirmedRegimen).map(([name,workouts]) => (
                <div className='regimen-entries' key={name}>
                    <h2 className='regimen-entrie-title'>{name}</h2>
                    {workouts.map(workout => (
                        <ul className='regimen-entrie-title-ul' key={workout.id}>
                            <li>{workout.workoutName}</li>
                            <li>{workout.workoutWeight}</li>
                            <li>{workout.workoutRep}</li>
                        </ul>
                    ))}
                </div>
            ))}

            {/* Add btn to save regimen to a DB */}
            <button onClick={handleSaveWorkoutToDB} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Workout'}
            </button>
            {saveStatus && (
                <p style={{ color: saveStatus.includes('Successfully') ? 'green' : 'red' }}>
                    {saveStatus}
                </p>
            )}
            {/* {error && <p style={{color: 'red'}}>{error}</p>} */}
        </div>
    )
}
