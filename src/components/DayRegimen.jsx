import React, {useState, useEffect } from 'react'
import { useNavBarContext } from '../context/NavContext.jsx'
import './DayRegimen.css'
import DayForm from './DayForm.jsx';
import CreatedWorkout from './CreatedWorkout.jsx';
import SubmittedRegimens from './SubmittedRegimens.jsx'



export default function DayRegimen() {

    const {
        setShowIcons,
        todaysRegimen,
        setTodaysRegimen,
        showCreatedWorkout,
        setShowCreatedWorkout,
        showSubmittedRegimens,
        setShowSubmittedRegimens
    } = useNavBarContext();

    const [regimenName, setRegimenName] = useState('')
    const [confirmedRegimen, setConfirmedRegimen] = useState({})
    
    // Set the icons to show in the Navbar when DayRegimen is mounted
    useEffect(() => {
        setShowIcons(true);  // Show icons when this component is mounted

        return () => {
            setShowIcons(false);  // Hide icons when this component is unmounted
        };
    }, [setShowIcons]);

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
                    <SubmittedRegimens confirmedRegimen={confirmedRegimen} />
                </div>
            )}
            
        </div>
    )
}
