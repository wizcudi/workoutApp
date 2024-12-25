import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useMeal } from '../../context/MealContext';

export default function MealDayHistory({ date, meals }) {
    const { deleteMeal } = useMeal();
    const [deletingMealId, setDeletingMealId] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Debug logs to inspect meal data
    // console.log('All meals for this day:', meals);
    // meals.forEach((meal, index) => {
    //     console.log(`Meal ${index + 1}:`, {
    //         name: meal.name,
    //         nutrients: meal.nutrients,
    //         caloriesValue: meal?.nutrients?.calories,
    //         caloriesType: typeof meal?.nutrients?.calories
    //     });
    // });
    
    // Calculate total calories for the day
    const totalCalories = meals.reduce((sum, meal) => {
        // Check if meal and nutrients exist and calories is a number
        const calories = parseFloat(meal?.nutrients?.calories);
        // console.log('Current meal calories:', calories); // Debug
        return sum + (Number.isFinite(calories) ? calories : 0);
    }, 0);

    const handleDelete = async (mealId) => {
        try {
            setDeletingMealId(mealId);
            await deleteMeal(mealId);
        } catch (error) {
            console.error('Error deleting meal:', error);
        } finally {
            setDeletingMealId(null);
        }
    };
    
    // Format date to display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            });
        }
    };

    return (
        <div className="bg-color-10-b rounded-lg shadow-sm border border-color-30/10">
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-color-30">
                        {formatDate(date)}
                    </h3>
                    <p className="text-sm text-color-30/70">
                        {meals.length} meal{meals.length !== 1 ? 's' : ''} • {Math.round(totalCalories)} calories
                    </p>
                </div>
                {isExpanded ? (
                    <ChevronUp className="text-color-30/50" size={20} />
                ) : (
                    <ChevronDown className="text-color-30/50" size={20} />
                )}
            </button>
            
            {isExpanded && (
                <div className="px-6 pb-4 space-y-4">
                    {meals.map(meal => (
                        <div 
                            key={meal.id} 
                            className="border-t border-color-30/10 pt-4 space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium">{meal.name}</h4>
                                    <p className="text-sm text-color-30/70">
                                        {meal.weight} {meal.weightUnit} • {new Date(meal.timestamp).toLocaleTimeString('en-US', { 
                                            hour: 'numeric', 
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(meal.id);
                                    }}
                                    disabled={deletingMealId === meal.id}
                                    className="p-2 text-color-30/50 hover:text-red-500 transition-colors disabled:opacity-50"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>    
                            <div className="grid grid-cols-3 gap-2 text-sm text-color-30/80">
                                {Object.entries(meal.nutrients).map(([nutrient, value]) => (
                                    <span key={nutrient}>
                                        {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}: {' '}
                                        {Math.round(value)}{nutrient === 'calories' ? '' : 'g'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
