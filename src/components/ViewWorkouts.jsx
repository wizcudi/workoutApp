import React, { useState, useEffect } from 'react';
import './ViewWorkouts.css'
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

  // const toggleRegimen = (workoutId) => {
  //   setVisibleWorkouts(prevState => ({
  //     ...prevState,
  //     [workoutId]: !prevState[workoutId]
  //   }));
  // };

  const toggleRegimen = (regimenIndex, workoutIndex) => {
    setVisibleWorkouts(prevState => ({
      ...prevState,
      [`${regimenIndex}-${workoutIndex}`]: !prevState[`${regimenIndex}-${workoutIndex}`]
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-workouts">
      <h2>Your Workouts</h2>

      {workouts.length === 0 ? (
        <p>You haven't created any workouts yet. Try creating one!</p>
      ) : (
        workouts.map((workoutSet, regimenIndex) => (
          <div key={workoutSet.id} className="workout-set">

            <h3>Regimen {regimenIndex + 1}</h3>

            {workoutSet.workouts?.map((workout, workoutIndex) => (

              <div 
                onClick={() => toggleRegimen(regimenIndex, workoutIndex)} 
                key={`${regimenIndex}-${workoutIndex}`} 
                className="workout"
              >

                <h4>{workout.name}</h4>
                {visibleWorkouts[`${regimenIndex}-${workoutIndex}`] && (
                  <div className='todays-workout'>
                    {workout.regimen.map((exercise, exerciseIndex) => (
                      <ul className="workout-ul" key={exerciseIndex}>
                        <li>
                          <span className="exercise-name">{exercise.workoutName}</span>
                        </li>
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




// import React, { useState, useEffect } from 'react';
// import './ViewWorkouts.css';
// import { db } from '../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import { useAuthContext } from '../context/AuthStateManager';

// function ViewWorkouts() {
//   const [workouts, setWorkouts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [visibleWorkouts, setVisibleWorkouts] = useState({});
//   const { user } = useAuthContext();  // No need for username, just use user.uid

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       if (!user) {
//         setError("User not authenticated");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         // Query workouts from the user's Firestore document
//         const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'workouts'));
//         const workoutList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setWorkouts(workoutList);
//       } catch (e) {
//         console.error("Error fetching workouts: ", e);
//         if (e.code === 'permission-denied') {
//           setError("Permission denied. Please ensure you're logged in and try again.");
//         } else {
//           setError("Failed to fetch workouts. Please try again later.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchWorkouts();
//   }, [user]);

//   const toggleRegimen = (workoutId) => {
//     setVisibleWorkouts(prevState => ({
//       ...prevState,
//       [workoutId]: !prevState[workoutId],
//     }));
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="view-workouts">
//       <h2>Your Workouts</h2>

//       {workouts.length === 0 ? (
//         <p>You haven't created any workouts yet. Try creating one!</p>
//       ) : (
//         workouts.map(workoutSet => (
//           <div key={workoutSet.id} className="workout-set">
//             <h3>Regimen: {workoutSet.workouts?.length > 0 ? workoutSet.workouts[0].name : 'No workouts available'}</h3>
//             {workoutSet.workouts?.map((workout, index) => (
//               <div 
//                 onClick={() => toggleRegimen(index)} 
//                 key={index} className="workout"
//               >
//                 <h4>{workout.name}</h4>
//                 {visibleWorkouts[index] && (
//                   <div className='todays-workout'>
//                     {workout.regimen.map((exercise, exerciseIndex) => (
//                       <ul className="workout-ul" key={exerciseIndex}>
//                         <li>
//                           <span className="exercise-name">{exercise.workoutName}</span>
//                         </li>
//                         <li>{exercise.workoutWeight} LBs</li>
//                         <li>{exercise.workoutRep} Reps</li>
//                       </ul>
//                     ))} 
//                   </div>                
//                 )}
//               </div>
//             ))}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default ViewWorkouts;

