import React, { useState } from 'react'
import Days from './Days'

export default function ProgramCard({header, cardBG, program}) {
    const [isVisible, setIsVisible] = useState(false);

 
    return (
        <div className={`flex flex-col shadow-md w-full rounded ${cardBG}`}>
            <div className='flex items-center px-4 py-6 justify-between'>
                <h2 className='text-color-10-b capitalize text-3xl font-semibold'>{header}</h2>
                <button 
                    onClick={() => setIsVisible(!isVisible)}
                    className='px-4 py-2 rounded bg-color-10-a text-color-30 font-semibold
                        hover:bg-color-30 hover:text-color-10-a hover:border hover:border-color-10-a'
                >
                    {isVisible ? 'Close' : 'View'}
                </button>
            </div>

            {isVisible && program.weeklyProgram && (
                <div className='flex flex-col bg-color-10-b gap-8 p-6'>
                    {program.weeklyProgram.map((week) => (
                        <div key={week.weekNumber} className='flex flex-col gap-4'>
                            <h3 className='text-2xl font-semibold text-color-30'>
                                {week.weekNumber === 0 ? 'Week 1' : `Week ${week.weekNumber++}`}
                            </h3>
                            <Days days={week.days} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}