import React, { useState } from 'react';
import Button from '../../../premade/Button';
import AdminBtn from '../../../premade/AdminBtn';
import {
    processSearchResults 
} from './utils/searchLogic';
import { useMeal } from '../../../context/MealContext';

const USDA_API_KEY = import.meta.env.VITE_USDA_API_KEY;
const USDA_API_ENDPOINT = 'https://api.nal.usda.gov/fdc/v1';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [weight, setWeight] = useState('');
    const [weightUnit, setWeightUnit] = useState('g'); // Default to grams
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { saveMeal, isLoading: isSaving } = useMeal();

    const searchUSDA = async (query) => {
        try {
            setLoading(true);
            setError(null);

            console.log('Searching for:', query);
            const response = await fetch(
                `${USDA_API_ENDPOINT}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(query)}&pageSize=100`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data from USDA');
            }

            const data = await response.json();
            console.log('API Response:', data);

            const results = processSearchResults(data.foods, query);
            console.log('Processed Results:', results);
            return results;

        } catch (err) {
            console.error('Search Error:', err);
            setError('Error fetching food data. Please try again.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Calculate adjusted nutrient values based on weight
    const calculateAdjustedNutrients = (nutrients) => {
        if (!weight) return nutrients;

        let factor = parseFloat(weight);
        if (isNaN(factor)) return nutrients;
        
        // Convert units to grams for calculation
        switch (weightUnit) {
            case 'oz':
                factor *= 28.3495;
                break;
            case 'lb':
                factor *= 453.592;
                break;
            case 'kg':
                factor *= 1000;
                break;
            case 'g':
                // Already in grams
                break;
            default:
                return nutrients;
        }
        
        // Convert to per 100g for calculation
        factor /= 100;

        return {
            calories: (nutrients.calories * factor).toFixed(1),
            protein: (nutrients.protein * factor).toFixed(1),
            fat: (nutrients.fat * factor).toFixed(1),
            carbs: (nutrients.carbs * factor).toFixed(1),
            fiber: (nutrients.fiber * factor).toFixed(1),
            sugar: (nutrients.sugar * factor).toFixed(1),
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        const results = await searchUSDA(searchTerm);
        setSearchResults(results);

        if (results.length === 0) {
            setError('No matches found. Try adjusting your search terms.');
        }
    };

    const handleSaveMeal = async (food) => {
        if (!weight) {
            setError('Please enter a weight before saving');
            return;
        }
        
        const adjustedNutrients = calculateAdjustedNutrients(food.nutrients);
        const mealData = {
            name: food.name,
            brandOwner: food.brandOwner,
            nutrients: adjustedNutrients
        };
        
        await saveMeal(mealData, weight, weightUnit);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Search input */}
                <div className='flex gap-2'>
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search food nurtrients facts"
                        className='
                            bg-color-60/20 border-2 border-color-30/50 px-2 py-1 rounded-md
                            focus:outline-none focus:border-color-10-a
                            w-full
                        '
                    />
                    <div>
                        <Button 
                            btnText={loading ? "Searching..." : "Search"}
                            bgColor="bg-color-10-a"
                            hoverColor="hover:bg-color-30 hover:border-color-10-a hover:border-2"
                            hoverText="hover:text-color-10-a"
                            btnTextStyle="font-bold text-color-30"
                            type="submit"
                        />
                    </div>
                </div>

                {/* Weight inputs */}
                <div className='flex gap-2 items-center'>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Amount"
                        className='
                            bg-color-60/20 border-2 border-color-30/50 px-2 py-1 rounded-md
                            focus:outline-none focus:border-color-10-a
                            w-24
                        '
                    />
                    <select
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value)}
                        className='
                            bg-color-60/20 border-2 border-color-30/50 px-2 py-1 rounded-md
                            focus:outline-none focus:border-color-10-a
                        '
                    >
                        <option value="g">grams</option>
                        <option value="oz">ounces</option>
                        <option value="lb">pounds</option>
                        <option value="kg">kilograms</option>
                    </select>
                </div>
            </form>

            {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            
            {searchResults.length > 0 && (
                <div className="mt-4 space-y-2">
                    {weight && (
                        <p className="text-sm text-color-30">
                            Showing nutrition for {weight} {weightUnit}
                        </p>
                    )}
                    {searchResults.map(food => (
                        <div 
                            key={food.id}
                            className="space-y-3 p-3 bg-color-60/40 rounded-md hover:bg-color-60"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{food.name}</h3>
                                    <p className="text-sm text-color-30/70">{food.brandOwner}</p>
                                </div>
                                <div>
                                    <AdminBtn
                                        onClick={() => handleSaveMeal(food)}
                                        disabled={isSaving}
                                        btnText={isSaving ? "Saving..." : "Save"}
                                    />
                                </div>
                            </div>
                            <div className=" text-sm grid grid-cols-3 max-500:grid-cols-2 gap-2">
                                {Object.entries(calculateAdjustedNutrients(food.nutrients)).map(([nutrient, value]) => (
                                    <span key={nutrient}>
                                        {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}: 
                                        {value}{nutrient === 'calories' ? '' : 'g'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}