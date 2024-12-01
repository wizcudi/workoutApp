import React, { createContext, useContext, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {

  // Initialize our workout data structure
  // Used for creating workouts
  const [workoutData, setWorkoutData] = useState({
    days: [{
      id: 1,
      workouts: [{
        id: 1,
        workoutName: '',
        weight: '',
        reps: '',
        sets: ''
      }]
    }]
  });

  // New state variables for viewing workouts
  const [savedWorkouts, setSavedWorkouts] = useState([]); // Stores all fetched workout programs
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state during fetches
  const [error, setError] = useState(null); // Stores any error messages
  const [currentWorkout, setCurrentWorkout] = useState(null); // Stores a single selected workout

  // Function to fetch all workouts for the current user
  const fetchWorkouts = async () => {
    if (!auth.currentUser) {
        setError("Please log in to view your workouts");
        return;
    }

    try {
        setIsLoading(true);
        setError(null);

        const userEmail = auth.currentUser.email;
        console.log("Fetching workouts for:", userEmail); // Debug log

        const workoutsCollection = collection(db, userEmail);
        const workoutsSnapshot = await getDocs(workoutsCollection);
        
        // Transform and filter the data
        const workoutsList = workoutsSnapshot.docs
            .filter(doc => doc.id !== 'user')  // Exclude user document
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

        console.log("Fetched workouts:", workoutsList); // Debug log
        setSavedWorkouts(workoutsList);  // Set the state

    } catch (error) {
        console.error("Error fetching workouts:", error);
        setError("Failed to load workouts. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };
 
  // Function to fetch a specific workout program
  const getSingleWorkout = async (programName) => {
    // Safety check for user authentication
    if (!auth.currentUser) {
        setError("Please log in to view this workout");
        return;
    }

    // Safety check for program name
    if (!programName) {
        setError("No workout program specified");
        return;
    }

    try {
        setIsLoading(true);
        setError(null);
        setCurrentWorkout(null);  // Clear any previously loaded workout

        const userEmail = auth.currentUser.email;

        // Add console log here
        console.log("Fetching workout with name:", programName);
        

        // Create reference to the specific workout document
        const workoutRef = doc(db, userEmail, programName);
        
        // Fetch the document
        const workoutSnap = await getDoc(workoutRef);

        // Add console log here
        console.log("Fetched data:", workoutSnap.data());


        if (!workoutSnap.exists()) {
            // If no document exists with this name
            setError("Workout program not found");
            return;
        }

        // Store the fetched workout in state
        const workoutData = {
            id: workoutSnap.id,  // This will be the program name
            ...workoutSnap.data()
        };

        // Add console log here
        console.log("Setting currentWorkout to:", workoutData);
        
        
        setCurrentWorkout(workoutData);

    } catch (error) {
        console.error("Error fetching workout:", error);
        setError("Failed to load workout program. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  // Function to clear any error messages
  const clearError = () => {
    setError(null);
  };

  // Function to reset workout creation state
  const clearWorkoutCreation = () => {
    // Reset to initial workout creation state
    setWorkoutData({
        days: [{
            id: 1,
            isOpen: true,
            workouts: [{
                id: 1,
                workoutName: '',
                weight: '',
                reps: '',
                sets: ''
            }]
        }]
    });
  };

  // Function to clear current workout view
  const clearCurrentWorkout = () => {
    setCurrentWorkout(null);
  };

  // Function to reset everything (useful when logging out)
  const resetAllWorkoutState = () => {
    clearError();
    clearWorkoutCreation();
    clearCurrentWorkout();
    setSavedWorkouts([]);
    setIsLoading(false);
  };




  // Function to toggle a day's open/closed state
  // Used for creating workouts
  const toggleDay = (dayId) => {
    setWorkoutData(prev => ({
      ...prev,
      days: prev.days.map(day =>
        day.id === dayId
          ? { ...day, isOpen: !day.isOpen }
          : day
      )
    }));
  };

  // Function to add a new day
  // Used for creating workouts
  const addDay = () => {
    setWorkoutData(prev => ({
      ...prev,
      days: [...prev.days, {
        id: Math.max(...prev.days.map(d => d.id)) + 1,
        isOpen: true,
        workouts: [{
          id: 1,
          workoutName: '',
          weight: '',
          reps: '',
          sets: ''
        }]
      }]
    }));
  };

  // Function to remove a day
  // Used for creating workouts
  const removeDay = () => {
    setWorkoutData(prev => {
      if (prev.days.length <= 1) return prev;
      return {
        ...prev,
        days: prev.days.slice(0, -1)
      };
    });
  };

  // Function to add a workout to a specific day
  // Used for creating workouts
  const addWorkout = (dayId) => {
    setWorkoutData(prev => ({
      ...prev,
      days: prev.days.map(day =>
        day.id === dayId
          ? {
              ...day,
              workouts: [...day.workouts, {
                id: Math.max(...day.workouts.map(w => w.id)) + 1,
                workoutName: '',
                weight: '',
                reps: '',
                sets: ''
              }]
            }
            : day
      )
    }));
  };

  // Function to remove a workout from a specific day
  // Used for creating workouts
  const removeWorkout = (dayId) => {
    setWorkoutData(prev => ({
      ...prev,
      days: prev.days.map(day =>
        day.id === dayId
            ? {
                ...day,
                workouts: day.workouts.length > 1 
                  ? day.workouts.slice(0, -1)
                  : day.workouts
            }
            : day
      )
    }));
  };

  // Function to update a specific workout field
  // Used for creating workouts
  const updateWorkout = (dayId, workoutId, field, value) => {
    setWorkoutData(prev => ({
      ...prev,
      days: prev.days.map(day =>
        day.id === dayId
          ? {
            ...day,
            workouts: day.workouts.map(workout =>
              workout.id === workoutId
                ? { ...workout, [field]: value }
                : workout
            )
          }
          : day
      )
    }));
  };


  return (
    <WorkoutContext.Provider value={{ 
      // Make the function available to components

      workoutData,
      toggleDay,
      addDay,
      removeDay,
      addWorkout,
      removeWorkout,
      updateWorkout,

      savedWorkouts,
      isLoading,
      error,
      currentWorkout,
      fetchWorkouts,
      getSingleWorkout,

      clearError,
      clearWorkoutCreation,
      clearCurrentWorkout,
      resetAllWorkoutState
    }}>
      {children}
    </WorkoutContext.Provider>
  );
}

// Custom hook to use the workout context
export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
      throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}
