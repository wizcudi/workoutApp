import React, { useEffect, useState }  from 'react'
import { useMeal } from '../../context/MealContext'
import MealDayHistory from './MealDayHistory';

export default function MealHistory() {

    const { mealHistory, fetchMealHistory, isLoading, error } = useMeal();
    const [dateFilter, setDateFilter] = useState('all');

    useEffect(() => {
        fetchMealHistory();
    }, []);

    const filterMeals = () => {
        if (dateFilter === 'all') return mealHistory;
        
        const today = new Date();
        const filterDate = new Date();
        
        switch(dateFilter) {
            case 'today':
                filterDate.setHours(0, 0, 0, 0);
                break;
            case 'week':
                filterDate.setDate(today.getDate() - 7);
                break;
            case 'month':
                filterDate.setMonth(today.getMonth() - 1);
                break;
            default:
                return mealHistory;
        }
        
        return mealHistory.filter(meal => 
            new Date(meal.timestamp) >= filterDate
        );
    };

    const groupMealsByDate = (meals) => {
        const groups = {};
        
        meals.forEach(meal => {
            const date = new Date(meal.timestamp).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(meal);
        });
        
        // Convert to array and sort by date (most recent first)
        return Object.entries(groups)
            .map(([date, meals]) => ({
                date,
                meals
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const filteredMeals = filterMeals();
    const groupedMeals = groupMealsByDate(filteredMeals);

    return (
        <div className="w-full max-w-3xl py-12 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-semibold text-color-30">Meal History</h1>
                <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-color-60/20 border-2 border-color-30/50 px-2 py-1 rounded-md"
                >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                </select>
            </div>

            {isLoading && <div className="text-center">Loading meals...</div>}
            {error && <div className="text-red-500">{error}</div>}

            {/* <div className="space-y-4 ">
                {filteredMeals.map(meal => (
                    <div key={meal.id} className="bg-color-10-b rounded-md p-4 space-y-6">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-semibold text-lg">{meal.name}</h3>
                                <p className="text-sm text-color-30/70">
                                    {meal.weight} {meal.weightUnit} • {new Date(meal.timestamp).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            {Object.entries(meal.nutrients).map(([nutrient, value]) => (
                                <span key={nutrient}>
                                    {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}: 
                                    {value}{nutrient === 'calories' ? '' : 'g'}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                
                {filteredMeals.length === 0 && !isLoading && (
                    <div className="text-center text-color-30/70">
                        No meals found for this time period
                    </div>
                )}
            </div> */}

            <div className="space-y-4">
                {groupedMeals.map(({ date, meals }) => (
                    <MealDayHistory 
                        key={date} 
                        date={date} 
                        meals={meals} 
                    />
                ))}
                
                {groupedMeals.length === 0 && !isLoading && (
                    <div className="text-center text-color-30/70">
                        No meals found for this time period
                    </div>
                )}
            </div>


        </div>
    )
}
