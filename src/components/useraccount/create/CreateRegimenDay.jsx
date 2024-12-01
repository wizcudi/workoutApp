import { useWorkout } from '../../WorkoutContext';
import CreateRegimenCard from './CreateRegimenCard'


export default function CreateRegimenDay() {
    
    // Get our state and functions from context
    const { workoutData, toggleDay, addDay, removeDay } = useWorkout();
    

    
    return (
        <div className='flex flex-col gap-4'>
            {/* Map through our days array to render each day */}
            {workoutData.days.map((day) => (
                <div 
                    key={day.id}
                    className='flex flex-col border-2 border-teal-600 rounded-b-lg'
                >
                    <div>
                        <div
                            onClick={() => toggleDay(day.id)}
                            className='
                                flex justify-between items-center
                                text-2xl font-semibold
                                py-4 px-6 
                                bg-teal-600
                                text-white
                                cursor-pointer
                                hover:bg-teal-500
                                transition-colors
                            '
                        >
                            <h2>Day {day.id}</h2>
                            <span>{day.isOpen ? '▼' : '▲'}</span>
                        </div>

                        <div className={`${day.isOpen ? 'flex' : 'hidden'}`}>
                            <CreateRegimenCard dayId={day.id} />
                        </div>
                    </div>
                </div>
            ))}

            <div className='
                flex flex-row gap-6
                mx-auto p-6
            '>
                <button
                    onClick={removeDay}
                    disabled={workoutData.days.length === 1}
                    className="
                        flex justify-center items-center
                        text-center
                        border-2 border-teal-600
                        text-gray-100 hover:text-teal-600
                        text-xl
                        bg-teal-600 hover:bg-teal-300
                        p-1 
                        rounded
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >
                    Remove Day
                </button>

                <button
                    onClick={addDay}
                    className="
                        flex justify-center items-center
                        text-center
                        border-2 border-teal-600
                        text-gray-100 hover:text-teal-600
                        text-xl
                        bg-teal-600 hover:bg-teal-300
                        p-1 
                        rounded
                    "
                >
                    Add Day
                </button>
            </div>

        </div>
    )
}
