import React, { useState } from 'react'
import Days from './Days'

export default function ProgramCard({header, cardBG, program}) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleView = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={`flex flex-col shadow-md w-full rounded ${cardBG}`}>
            <div className='flex items-center px-4 py-6 justify-between'>
                <h2 className='text-color-10-b capitalize text-3xl font-semibold'>{header}</h2>
                <button 
                    type="button"
                    onClick={toggleView}
                    className='
                        px-4 py-2 rounded
                        bg-color-10-a text-color-30 font-semibold
                        hover:bg-color-30 hover:text-color-10-a hover:border hover:border-color-10-a
                    '
                >
                    {isVisible ? 'Close' : 'View'}
                </button>
            </div>

            {isVisible && program.days && (
                <div className='
                    flex flex-col bg-white 
                    bg-color-10-b
                '
                
                >
                    <Days days={program.days} />
                </div>
            )}
        </div>
    );
}