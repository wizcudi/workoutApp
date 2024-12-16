import React, { useState } from 'react';
import WorkoutInput from '../../Inputs/WorkoutInput';

export default function ProgressiveOverloadForm({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        weeks: '',
        weightIncrease: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-6">Progressive Overload Settings</h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <WorkoutInput 
                        title="Number of Weeks"
                        placeholder="Enter number of weeks"
                        type="number"
                        value={formData.weeks}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            weeks: e.target.value
                        }))}
                    />
                    
                    <WorkoutInput 
                        title="Weight Increase (lbs)"
                        placeholder="Enter weight increase per week"
                        type="number"
                        value={formData.weightIncrease}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            weightIncrease: e.target.value
                        }))}
                    />

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-color-30 text-white rounded hover:bg-color-30/80"
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}