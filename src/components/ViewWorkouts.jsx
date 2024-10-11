import React, { useState, useEffect } from 'react';

import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthContext } from '../context/AuthStateManager';

function ViewWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleWorkouts, setVisibleWorkouts] = useState({});
  const { user,username } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) {
        setError("User not authenticated");
        setIsLoading(false);
        return;
      }

      try {
        // Query workouts from the collection named after the cached username
        const querySnapshot = await getDocs(collection(db, username));
        const workoutList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWorkouts(workoutList);
      } catch (e) {
        console.error("Error fetching workouts: ", e);
        if (e.code === 'permission-denied') {
          setError("Permission denied. Please ensure you're logged in and try again.");
        } else {
          setError("Failed to fetch workouts. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, [user, username]);


  const toggleRegimen = (regimenIndex, workoutIndex) => {
    setVisibleWorkouts(prevState => ({
      ...prevState,
      [`${regimenIndex}-${workoutIndex}`]: !prevState[`${regimenIndex}-${workoutIndex}`]
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-10 p-10">
      <h2 className="text-4xl text-center">Your Workouts</h2>

      {workouts.length === 0 ? (
        <p>No workouts found. Try creating one!</p>
      ) : (
        workouts.map((workoutSet, regimenIndex) => (
          <div key={workoutSet.id} className="flex flex-col gap-5 border p-5 rounded-md">

            <h3 className="text-2xl">Regimen {regimenIndex + 1}</h3>

            {workoutSet.workouts?.map((workout, workoutIndex) => (

              <div 
                onClick={() => toggleRegimen(regimenIndex, workoutIndex)} 
                key={`${regimenIndex}-${workoutIndex}`} 
                className="flex flex-col gap-5 p-4 border-2 border-blue-500 cursor-pointer"
              >

                <h4 className="text-xl">{workout.name}</h4>
                {visibleWorkouts[`${regimenIndex}-${workoutIndex}`] && (
                  <div className="flex flex-col gap-4 border-2 border-green-500 p-4">
                    {workout.regimen.map((exercise, exerciseIndex) => (
                      <ul key={exerciseIndex} className="flex flex-col gap-2 border-2 border-red-500 p-2">
                        <li className="font-semibold capitalize">{exercise.workoutName}</li>
                        <li>{exercise.workoutWeight} LBs</li>
                        <li>{exercise.workoutRep} Reps</li>
                      </ul>
                    ))} 
                  </div>                
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default ViewWorkouts;
