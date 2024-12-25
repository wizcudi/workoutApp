import React, { createContext, useContext, useState } from 'react';
import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const MealContext = createContext();

export function MealProvider({ children }) {
    const [mealHistory, setMealHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const saveMeal = async (foodData, weight, weightUnit) => {
        if (!auth.currentUser) {
            setError("Please log in to save meals");
            return;
        }

        try {
            setIsLoading(true);
            const userEmail = auth.currentUser.email;
            const mealData = {
                ...foodData,
                weight,
                weightUnit,
                timestamp: new Date().toISOString()
            };

            const mealHistoryRef = collection(db, userEmail, 'mealHistory', 'meals');
            await addDoc(mealHistoryRef, mealData);
        } catch (error) {
            console.error("Error saving meal:", error);
            setError("Failed to save meal");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteMeal = async (mealId) => {
        if (!auth.currentUser) {
            setError("Please log in to delete meals");
            return;
        }

        try {
            setIsLoading(true);
            const userEmail = auth.currentUser.email;
            const mealRef = doc(db, userEmail, 'mealHistory', 'meals', mealId);
            await deleteDoc(mealRef);
            
            // Update local state to remove the deleted meal
            setMealHistory(prevMeals => prevMeals.filter(meal => meal.id !== mealId));
        } catch (error) {
            console.error("Error deleting meal:", error);
            setError("Failed to delete meal");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMealHistory = async () => {
        if (!auth.currentUser) {
            setError("Please log in to view meal history");
            return;
        }

        try {
            setIsLoading(true);
            const userEmail = auth.currentUser.email;
            const mealsRef = collection(db, userEmail, 'mealHistory', 'meals');
            const q = query(mealsRef, orderBy('timestamp', 'desc'));
            
            const snapshot = await getDocs(q);
            const meals = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setMealHistory(meals);
        } catch (error) {
            console.error("Error fetching meals:", error);
            setError("Failed to load meal history");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MealContext.Provider value={{
            mealHistory,
            isLoading,
            error,
            saveMeal,
            deleteMeal,
            fetchMealHistory
        }}>
            {children}
        </MealContext.Provider>
    );
}

export function useMeal() {
    const context = useContext(MealContext);
    if (!context) {
        throw new Error('useMeal must be used within a MealProvider');
    }
    return context;
}