import React, { useState } from 'react'
import Days from './Days'

export default function ProgramCard({header, cardBG, program}) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleView = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={`flex flex-col gap-8 px-4 py-6 shadow-md w-full rounded ${cardBG}`}>
            <div className='flex items-center justify-between'>
                <h2 className='text-zinc-800 text-3xl font-semibold'>{header}</h2>
                <button 
                    type="button"
                    onClick={toggleView}
                    className='px-4 py-2 border-2 border-zinc-800 bg-white rounded'
                >
                    {isVisible ? 'Close' : 'View'}
                </button>
            </div>

            {isVisible && program.days && (
                <div className='flex flex-col bg-white border-x border-t border-zinc-800'>
                    <Days days={program.days} />
                </div>
            )}
        </div>
    );
}