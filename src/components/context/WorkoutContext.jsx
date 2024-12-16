import React, { createContext, useContext, useState } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {

  const [savedWorkouts, setSavedWorkouts] = useState([]); // Stores all fetched workout programs
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state during fetches
  const [error, setError] = useState(null); // Stores any error messages
  const [currentWorkout, setCurrentWorkout] = useState(null); // Stores a single selected workout

  const [days, setDays] = useState({
    byId: {
      1: { id: 1, isOpen: true, workoutIds: [1] }
    },
    allIds: [1]
  });

  const [workouts, setWorkouts] = useState({
    byId: {
      1: { id: 1, dayId: 1, workoutName: '', weight: '', reps: '', sets: '' }
    },
    allIds: [1]
  });

  const [progressiveOverload, setProgressiveOverload] = useState({
    enabled: false,
    settings: {
      weeks: 0,
      weightIncrease: 0
    },
    progressions: {} // Will store weekly weight progressions for each workout
  });

  const applyProgressiveOverload = (weeks, weightIncrease) => {
    const newProgressions = {};
    
    // For each day and workout, calculate and store weekly progressions
    days.allIds.forEach(dayId => {
      const day = days.byId[dayId];
      day.workoutIds.forEach(workoutId => {
        const workout = workouts.byId[workoutId];
        const baseWeight = parseFloat(workout.weight) || 0;
        
        newProgressions[workoutId] = {
          baseWeight,
          weeklyWeights: {}
        };
  
        // Calculate weight for each week
        for (let week = 1; week <= weeks; week++) {
          newProgressions[workoutId].weeklyWeights[week] = 
            baseWeight + (parseFloat(weightIncrease) * week);
        }
      });
    });
  
    setProgressiveOverload({
      enabled: true,
      settings: { weeks, weightIncrease },
      progressions: newProgressions
    });
  };


  const saveWorkout = async (programName) => {
    if (!auth.currentUser) {
      console.log("Auth check failed - no current user");
      setError("Please log in to save workouts");
      return;
    }
  
    if (!programName.trim()) {
      console.log("Program name validation failed - empty name");
      setError("Please enter a program name");
      return;
    }
  
    try {
      setIsLoading(true);
      const userEmail = auth.currentUser.email;

      // console.log("Current user email:", userEmail);
      // console.log("Program name:", programName);
      // console.log("Current days state:", days);
      // console.log("Current workouts state:", workouts);
  
      // Create a reference to the program document within the programs collection
      const programRef = doc(
        collection(db, userEmail, 'Workouts', 'programs'), 
        programName
      );
      // const docRef = doc(db, userEmail,'Workouts',new Date().toISOString(), programName);
      
  
      const saveData = {
        name: programName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: userEmail,
        days: days.byId,
        workouts: workouts.byId,

        progressiveOverload: {
          enabled: progressiveOverload.enabled,
          settings: progressiveOverload.settings,
          progressions: progressiveOverload.progressions
        }

      };

      // console.log("Data being saved:", saveData);
      
      await setDoc(programRef, saveData);
      // await setDoc(docRef, saveData);
      // console.log("Save successful");
  
      clearWorkoutCreation();
      return true;
    } catch (error) {
      console.error("Detailed error information:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      setError("Failed to save workout");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWorkouts = async () => {
    if (!auth.currentUser) {
      setError("Please log in to view your workouts");
      return;
    }
  
    try {
      setIsLoading(true);
      const userEmail = auth.currentUser.email;
      const programsRef = collection(db, userEmail, 'Workouts', 'programs');
      const programsSnapshot = await getDocs(programsRef);
      
      const workoutsList = [];
  
      for (const programDoc of programsSnapshot.docs) {
        const programData = programDoc.data();
        
        // Check if progressive overload is enabled for this program
        const hasProgressiveOverload = programData.progressiveOverload?.enabled;
        
        // For programs without progressive overload, just show the base program
        if (!hasProgressiveOverload) {
          const daysArray = Object.entries(programData.days)
            .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            .map(([dayId, day]) => ({
              id: parseInt(dayId),
              workouts: Object.values(programData.workouts)
                .filter(workout => workout.dayId === parseInt(dayId))
                .map(workout => ({
                  id: workout.id,
                  workoutName: workout.workoutName,
                  reps: workout.reps,
                  sets: workout.sets,
                  weight: workout.weight
                }))
            }));
  
          workoutsList.push({
            id: programDoc.id,
            name: programData.name,
            hasProgressiveOverload: false,
            weeklyProgram: [{
              weekNumber: 0,
              days: daysArray
            }]
          });
          continue;
        }
  
        // Handle programs with progressive overload
        const requestedWeeks = programData.progressiveOverload.settings.weeks;
        const weeklyProgram = [];
        
        // First, add the base week (week 0)
        const baseWeekDays = Object.entries(programData.days)
          .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
          .map(([dayId, day]) => ({
            id: parseInt(dayId),
            workouts: Object.values(programData.workouts)
              .filter(workout => workout.dayId === parseInt(dayId))
              .map(workout => ({
                id: workout.id,
                workoutName: workout.workoutName,
                reps: workout.reps,
                sets: workout.sets,
                weight: workout.weight // Original weight for base week
              }))
          }));
  
        weeklyProgram.push({
          weekNumber: 0,
          days: baseWeekDays
        });
        
        // Then add progression weeks (1 to requestedWeeks-1)
        // We subtract 1 because week 0 counts as one of the total weeks
        for (let week = 1; week < requestedWeeks; week++) {
          const daysInWeek = Object.entries(programData.days)
            .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            .map(([dayId, day]) => ({
              id: parseInt(dayId),
              workouts: Object.values(programData.workouts)
                .filter(workout => workout.dayId === parseInt(dayId))
                .map(workout => {
                  const baseWeight = parseFloat(workout.weight) || 0;
                  const increase = parseFloat(programData.progressiveOverload.settings.weightIncrease);
                  const weeklyWeight = (baseWeight + (increase * week)).toString();
  
                  return {
                    id: workout.id,
                    workoutName: workout.workoutName,
                    reps: workout.reps,
                    sets: workout.sets,
                    weight: weeklyWeight
                  };
                })
            }));
  
          weeklyProgram.push({
            weekNumber: week,
            days: daysInWeek
          });
        }
  
        workoutsList.push({
          id: programDoc.id,
          name: programData.name,
          hasProgressiveOverload: true,
          weeklyProgram
        });
      }
  
      setSavedWorkouts(workoutsList);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setError("Failed to load workouts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 
  const getSingleWorkout = async (programName) => {
    if (!auth.currentUser || !programName) {
      setError(!auth.currentUser ? "Please log in" : "No workout specified");
      return;
    }
  
    try {
      setIsLoading(true);
      const userEmail = auth.currentUser.email;
      const workoutSnap = await getDoc(doc(db, 'users', userEmail, 'Workouts', programName));
      
      if (!workoutSnap.exists()) {
        setError("Workout program not found");
        return;
      }
  
      setCurrentWorkout({
        id: workoutSnap.id,
        ...workoutSnap.data()
      });
    } catch (error) {
      console.error("Error fetching workout:", error);
      setError("Failed to load workout program");
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleDay = (dayId) => {
    setDays(prev => ({
      ...prev,
      byId: {
        ...prev.byId,
        [dayId]: {
          ...prev.byId[dayId],
          isOpen: !prev.byId[dayId].isOpen
        }
      }
    }));
  };
  
  const addDay = () => {
    const newDayId = Math.max(...days.allIds) + 1;
    const newWorkoutId = Math.max(...workouts.allIds) + 1;

    setWorkouts(prev => ({
      byId: {
        ...prev.byId,
        [newWorkoutId]: {
          id: newWorkoutId,
          dayId: newDayId,
          workoutName: '',
          weight: '',
          reps: '',
          sets: ''
        }
      },
      allIds: [...prev.allIds, newWorkoutId]
    }));

    setDays(prev => ({
      byId: {
        ...prev.byId,
        [newDayId]: {
          id: newDayId,
          isOpen: true,
          workoutIds: [newWorkoutId]
        }
      },
      allIds: [...prev.allIds, newDayId]
    }));
  };

  const removeDay = () => {
    if (days.allIds.length <= 1) return;

    const dayIdToRemove = days.allIds[days.allIds.length - 1];
    const workoutIdsToRemove = days.byId[dayIdToRemove].workoutIds;

    setWorkouts(prev => {
      const newById = { ...prev.byId };
      workoutIdsToRemove.forEach(id => delete newById[id]);
      return {
        byId: newById,
        allIds: prev.allIds.filter(id => !workoutIdsToRemove.includes(id))
      };
    });

    setDays(prev => {
      const { [dayIdToRemove]: removed, ...remaining } = prev.byId;
      return {
        byId: remaining,
        allIds: prev.allIds.filter(id => id !== dayIdToRemove)
      };
    });
  };
  
  const addWorkout = (dayId) => {
    const newWorkoutId = Math.max(...workouts.allIds) + 1;

    setWorkouts(prev => ({
      byId: {
        ...prev.byId,
        [newWorkoutId]: {
          id: newWorkoutId,
          dayId,
          workoutName: '',
          weight: '',
          reps: '',
          sets: ''
        }
      },
      allIds: [...prev.allIds, newWorkoutId]
    }));

    setDays(prev => ({
      ...prev,
      byId: {
        ...prev.byId,
        [dayId]: {
          ...prev.byId[dayId],
          workoutIds: [...prev.byId[dayId].workoutIds, newWorkoutId]
        }
      }
    }));
  };

  const removeWorkout = (dayId, workoutId) => {
    if (days.byId[dayId].workoutIds.length <= 1) return;

    setWorkouts(prev => {
      const { [workoutId]: removed, ...remaining } = prev.byId;
      return {
        byId: remaining,
        allIds: prev.allIds.filter(id => id !== workoutId)
      };
    });

    setDays(prev => ({
      ...prev,
      byId: {
        ...prev.byId,
        [dayId]: {
          ...prev.byId[dayId],
          workoutIds: prev.byId[dayId].workoutIds.filter(id => id !== workoutId)
        }
      }
    }));
  };
  
  const updateWorkout = (dayId, workoutId, field, value) => {
    setWorkouts(prev => ({
      ...prev,
      byId: {
        ...prev.byId,
        [workoutId]: {
          ...prev.byId[workoutId],
          [field]: value
        }
      }
    }));
  };

  const clearError = () => {
    setError(null);
  };

  const clearWorkoutCreation = () => {
    setDays({
      byId: { 1: { id: 1, isOpen: true, workoutIds: [1] } },
      allIds: [1]
    });
    setWorkouts({
      byId: { 1: { id: 1, dayId: 1, workoutName: '', weight: '', reps: '', sets: '' } },
      allIds: [1]
    });
  };

  const clearCurrentWorkout = () => {
    setCurrentWorkout(null);
  };

  const resetAllWorkoutState = () => {
    clearError();
    clearWorkoutCreation();
    clearCurrentWorkout();
    setSavedWorkouts([]);
    setIsLoading(false);
  };


  return (
    <WorkoutContext.Provider value={{ 
      days,
      workouts,
      savedWorkouts,
      isLoading,
      error,
      currentWorkout,
      saveWorkout,
      toggleDay,
      addDay,
      removeDay,
      addWorkout,
      removeWorkout,
      updateWorkout,
      fetchWorkouts,
      getSingleWorkout,
      clearError,
      clearWorkoutCreation,
      clearCurrentWorkout,
      resetAllWorkoutState,

      progressiveOverload,
      applyProgressiveOverload,

    }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
      throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}
