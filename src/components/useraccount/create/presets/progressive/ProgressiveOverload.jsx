import React, { useState }  from 'react'
import { useWorkout } from '../../../../context/WorkoutContext';
import ProgressiveOverloadForm from './ProgressiveOverloadForm'
import AdminBtn from '../../../../premade/AdminBtn';

export default function ProgressiveOverload() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { applyProgressiveOverload } = useWorkout();
    
    const handleProgressiveOverload = (formData) => {
        const { weeks, weightIncrease } = formData;
        applyProgressiveOverload(parseInt(weeks), parseFloat(weightIncrease));
        setIsFormOpen(false);
    };

    return (
        <>
            {/* <button
                onClick={() => setIsFormOpen(true)}
                className="border-2 border-color-30 bg-color-30 text-color-10-b
                    text-lg font-semibold px-4 py-2 rounded-md
                    hover:bg-color-10-a hover:text-color-30 transition-colors"
            >
                Set Progressive Overload
            </button> */}
            <AdminBtn
                onClick={() => setIsFormOpen(true)}
                // disabled={isLoading}
                btnText='Set Progressive Overload'
            />

            {isFormOpen && (
                <ProgressiveOverloadForm
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleProgressiveOverload}
                />
            )}
        </>
    );
}
