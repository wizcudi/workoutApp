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
            flex flex-col gap-4 
        ">
            <WorkoutInput 
                title="Workout Name"
                placeholder="Enter workout name"
                type='text'
                value={workout.workoutName}
                onChange={(e) => updateWorkout(dayId, workoutId, 'workoutName', e.target.value)}
            />

            <div className='
                flex flex-col items-start
                gap-6 p-4 bg-white rounded
            '>
                <WorkoutInput 
                    title={"Weight"}
                    placeholder={"45lbs"}
                    type='number'
                    value={workout.weight}
                    onChange={(e) => updateWorkout(dayId, workoutId, 'weight', e.target.value)}
                />
                <div className=' border border-gray-300 w-full'/>
                <WorkoutInput 
                    title="Reps"
                    placeholder="10"
                    type="number"
                    value={workout.reps}
                    onChange={(e) => updateWorkout(dayId, workoutId, 'reps', e.target.value)}
                />
                <div className=' border border-gray-300 w-full'/>
                <WorkoutInput 
                    title="Sets"
                    placeholder="3"
                    type="number"
                    value={workout.sets}
                    onChange={(e) => updateWorkout(dayId, workoutId, 'sets', e.target.value)}
                />

            </div>
        </div>
    )
}
