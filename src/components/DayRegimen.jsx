import React, {useState} from 'react'
import DayForm from './DayForm.jsx';
import CreatedWorkout from './CreatedWorkout.jsx';
import SubmittedRegimens from './SubmittedRegimens.jsx'
// import Button from './Button.jsx';
import { Clipboard, List } from 'lucide-react';
import './DayRegimen.css'


export default function DayRegimen() {
    const [todaysRegimen, setTodaysRegimen] = useState([])
    const [regimenName, setRegimenName] = useState('')
    const [confirmedRegimen, setConfirmedRegimen] = useState({})

    const [showCreatedWorkout, setShowCreatedWorkout] = useState(false);
    const [showSubmittedRegimens, setShowSubmittedRegimens] = useState(false);
   

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
        <div className="day-regimen">

            <DayForm onAddWorkout={addWorkout} />

            <div className="icon-buttons">
                <button 
                    className="icon-button"
                    onClick={() => setShowCreatedWorkout(!showCreatedWorkout)} 
                >
                    <Clipboard  />
                    {todaysRegimen.length > 0 && (
                        <span className="icon-badge">
                            {todaysRegimen.length}
                        </span>
                    )}
                </button>

                <button 
                    className="icon-button"
                    onClick={() => setShowSubmittedRegimens(!showSubmittedRegimens)}
                >
                    <List />
                </button>
            </div>


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
            {/* <CreatedWorkout 
                todaysRegimen={todaysRegimen}
                regimenName={regimenName}
                setRegimenName={setRegimenName}
                onSubmitRegimen={submitRegimen} 
            /> */}



            {showSubmittedRegimens && (
                <div className="popup-container">
                    <SubmittedRegimens confirmedRegimen={confirmedRegimen} />
                </div>
            )}
            {/* <SubmittedRegimens confirmedRegimen={confirmedRegimen} /> */}

        </div>
    )
}
