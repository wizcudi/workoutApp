import { useWorkout } from '../../context/WorkoutContext';
import CreateRegimenCard from './CreateRegimenCard'


export default function CreateRegimenDay() {
    
    const { days, toggleDay, addDay, removeDay } = useWorkout();
    
    return (
        <div className='flex flex-col gap-2'>
            {days.allIds.map((dayId) => {
                const day = days.byId[dayId];
                return (
                    <div key={dayId} className='flex flex-col border-2 border-color-30'>
                        <div>
                            <div
                                onClick={() => toggleDay(day.id)}
                                className='flex justify-between items-center text-2xl text-color-60 font-semibold
                                    py-4 px-6 bg-color-30 cursor-pointer hover:bg-color-10-a hover:text-color-30 transition-colors'
                            >
                                <h2>Day {day.id}</h2>
                                <span>{day.isOpen ? '▼' : '▲'}</span>
                            </div>
                            <div className={`${day.isOpen ? 'flex' : 'hidden'}`}>
                                <CreateRegimenCard dayId={day.id} />
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className='flex flex-row gap-6 mx-auto p-6'>
                <button
                    onClick={removeDay}
                    disabled={days.allIds.length === 1}
                    className="
                        flex justify-center items-center 
                        text-center text-xl font-semibold 
                        text-color-60 hover:text-color-30 
                        border-2 border-color-30 
                        bg-color-30 hover:bg-color-10-a 
                        px-4 py-2 rounded 
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                >
                    Remove Day
                </button>
                <button onClick={addDay} className="
                    flex justify-center items-center 
                    text-center text-xl font-semibold
                    text-color-60 hover:text-color-30 
                    border-2 border-color-30 
                    bg-color-30 hover:bg-color-10-a 
                    px-4 py-2 rounded
                ">
                    Add Day
                </button>
            </div>
        </div>
    );
}
