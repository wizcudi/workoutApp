import React, { useState } from 'react'
import Button from '../../../premade/Button'

const NUTRITIONIX_APP_ID = import.meta.env.VITE_NUTRITIONIX_APP_ID;
const NUTRITIONIX_API_KEY = import.meta.env.VITE_NUTRITIONIX_API_KEY;

export default function BarcodeScanner() {
    const [barcode, setBarcode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchNutritionix = async (upc) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `https://trackapi.nutritionix.com/v2/search/item?upc=${upc}`,
                {
                    method: 'GET',
                    headers: {
                        'x-app-id': NUTRITIONIX_APP_ID,
                        'x-app-key': NUTRITIONIX_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data from Nutritionix');
            }

            const data = await response.json();
            return data.foods.map(food => ({
                id: food.nix_item_id,
                name: food.food_name,
                brandOwner: food.brand_name,
                nutrients: {
                    calories: food.nf_calories,
                    protein: food.nf_protein,
                    fat: food.nf_total_fat,
                    carbs: food.nf_total_carbohydrate,
                }
            }));
        } catch (err) {
            setError('Error scanning barcode. Please try again.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!barcode.trim()) return;

        await searchNutritionix(barcode);
    };

    return (
        <div className="space-y-4">
            <form className='flex gap-2' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="Enter barcode..."
                    className='
                        bg-color-60/20 border-2 border-color-30/50 px-2 py-1 rounded-md
                        focus:outline-none focus:border-color-10-a
                        w-full
                    '
                />

                <div>
                    <Button 
                        btnText={loading ? "Scanning..." : "Scan"}
                        bgColor="bg-color-10-a"
                        hoverColor="hover:bg-color-30 hover:border-color-10-a hover:border-2"
                        hoverText="hover:text-color-10-a"
                        btnTextStyle="font-bold text-color-30"
                        type="submit"
                    />
                </div>
            </form>

            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}
        </div>
    )
}
