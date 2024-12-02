import { useWorkout } from '../../WorkoutContext';
import WorkoutCard from '../create/WorkoutCard' 

export default function CreateRegimenCard({ dayId }) {
    // Get our state and functions from context
    const { workoutData, addWorkout, removeWorkout } = useWorkout();
    
    
    // Find the current day's workouts
    const day = workoutData.days.find(d => d.id === dayId);
    
    
    return (
        <div className='
            flex flex-col gap-6 py-10 w-full bg-color-10-b 
        '>   
            {/* Map through the day's workouts */}
            {day.workouts.map((workout) => (
                <WorkoutCard 
                    key={workout.id}
                    dayId={dayId}
                    workoutId={workout.id}
                />

                
            ))}

            {/* Add & Remove Workouts btn */}
            <div className='flex flex-row gap-6 mx-auto'>
                <button
                    onClick={() => removeWorkout(dayId)}
                    disabled={day.workouts.length === 1}
                    className={`
                        flex justify-center items-center text-center
                        border-2 border-color-30 text-2xl h-10 w-10 pb-1 rounded-full
                        ${day.workouts.length === 1 
                            ? 'opacity-50 cursor-not-allowed bg-gray-400 border-gray-400 text-white'
                            : 'text-color-30 bg-color-10-a hover:bg-color-10-a/50'
                        }
                    `}
                >
                    -
                </button>

                <button
                    onClick={() => addWorkout(dayId)}
                    className="
                        flex justify-center items-center 
                        text-center text-2xl text-color-30
                        border-2 border-color-30 h-10 w-10 pb-1 rounded-full
                        bg-color-10-a hover:bg-color-10-a/50 
                    "
                >
                    +
                </button>
            </div>
            
        </div>
    )
}
