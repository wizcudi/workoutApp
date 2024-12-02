import { useWorkout } from '../../WorkoutContext';
import WorkoutInput from './Inputs/WorkoutInput'

export default function WorkoutCard({ dayId, workoutId }) {

    // Get our state and update function from context
    const { workoutData, updateWorkout } = useWorkout();
    
    // Find the current workout data
    const workout = workoutData.days
        .find(d => d.id === dayId)
        .workouts.find(w => w.id === workoutId);


    return (
        <div className="
            flex flex-col gap-6
        ">
            <div className='flex flex-col gap-6 px-8'>
                <WorkoutInput 
                    title="Workout Name"
                    placeholder="Enter workout name"
                    type='text'
                    value={workout.workoutName}
                    onChange={(e) => updateWorkout(dayId, workoutId, 'workoutName', e.target.value)}
                />
                <div className='
                    flex flex-col items-start
                    gap-6 bg-white 
                '>
                    <WorkoutInput 
                        title={"Weight"}
                        placeholder={"45lbs"}
                        type='number'
                        value={workout.weight}
                        onChange={(e) => updateWorkout(dayId, workoutId, 'weight', e.target.value)}
                    />

                    <WorkoutInput 
                        title="Reps"
                        placeholder="10"
                        type="number"
                        value={workout.reps}
                        onChange={(e) => updateWorkout(dayId, workoutId, 'reps', e.target.value)}
                    />

                    <WorkoutInput 
                        title="Sets"
                        placeholder="3"
                        type="number"
                        value={workout.sets}
                        onChange={(e) => updateWorkout(dayId, workoutId, 'sets', e.target.value)}
                    />



                </div>
            </div>

            <div className=' border border-color-30 w-full my-6'></div>

        </div>
    )
}
