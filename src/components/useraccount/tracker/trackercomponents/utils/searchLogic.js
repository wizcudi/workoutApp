// Utils for text processing
export const normalizeText = (text) => {
    return text.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

// Transform USDA food data into our application format
export const transformFoodData = (food) => ({
    id: food.fdcId,
    name: food.description,
    brandOwner: food.brandOwner || 'Generic',
    nutrients: {
        calories: food.foodNutrients.find(n => n.nutrientId === 1008)?.value || 0,
        protein: food.foodNutrients.find(n => n.nutrientId === 1003)?.value || 0,
        fat: food.foodNutrients.find(n => n.nutrientId === 1004)?.value || 0,
        carbs: food.foodNutrients.find(n => n.nutrientId === 1005)?.value || 0,
        fiber: food.foodNutrients.find(n => n.nutrientId === 1079)?.value || 0,
        sugar: food.foodNutrients.find(n => n.nutrientId === 2000)?.value || 0,
    }
});

// Process search results and categorize them
export const processSearchResults = (foods, searchTerm) => {
    if (!foods || !Array.isArray(foods)) {
        console.error('Invalid foods data:', foods);
        return [];
    }

    const normalizedSearchTerm = normalizeText(searchTerm);
    console.log('Normalized search term:', normalizedSearchTerm);

    // Create arrays for different match types
    const exactMatches = [];
    const partialMatches = [];
    const otherMatches = [];

    foods.forEach(food => {
        if (!food.description) return;
        
        const normalizedFoodName = normalizeText(food.description);
        const transformedFood = transformFoodData(food);
        
        // Exact match (removing "raw" and other qualifiers)
        if (normalizedFoodName === normalizedSearchTerm) {
            exactMatches.push(transformedFood);
        }
        // Starts with search term
        else if (normalizedFoodName.startsWith(normalizedSearchTerm)) {
            partialMatches.push(transformedFood);
        }
        // Contains search term
        else if (normalizedFoodName.includes(normalizedSearchTerm)) {
            otherMatches.push(transformedFood);
        }
    });

    // Combine all matches in priority order
    const allResults = [...exactMatches, ...partialMatches, ...otherMatches];
    console.log('Search results:', {
        exact: exactMatches.length,
        partial: partialMatches.length,
        other: otherMatches.length
    });

    return allResults;
};