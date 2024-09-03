import React, {useState} from 'react'
import DayForm from './DayForm.jsx';
import CreatedWorkout from './CreatedWorkout.jsx';
import SubmittedRegimens from './SubmittedRegimens.jsx'

export default function DayRegimen() {
    const [todaysRegimen, setTodaysRegimen] = useState([])
    const [regimenName, setRegimenName] = useState('')
    const [confirmedRegimen, setConfirmedRegimen] = useState({})
    

    // Function to add new workout
    const addWorkout = (currentWorkout) => {
        setTodaysRegimen(prevRegimen => [...prevRegimen, { ...currentWorkout, id: Date.now() }]);
    };

    // submits list created to one finalized list
    const submitRegimen = () => {
        if (regimenName && todaysRegimen.length > 0) {
            setConfirmedRegimen(prevList => ({
                ...prevList,
                [regimenName]: todaysRegimen
            }));
            // clear current regimen list
            setTodaysRegimen([])
            // reset the regimen name input
            setRegimenName('')
        } else {
            alert('Please name today\'s regimen and add atleast one workout.')
        }
    }

    return (
        <div>
            <DayForm onAddWorkout={addWorkout} />

            <CreatedWorkout 
                todaysRegimen={todaysRegimen}
                regimenName={regimenName}
                setRegimenName={setRegimenName}
                onSubmitRegimen={submitRegimen} 
            />

            <SubmittedRegimens confirmedRegimen={confirmedRegimen} />
        </div>
    )
}
