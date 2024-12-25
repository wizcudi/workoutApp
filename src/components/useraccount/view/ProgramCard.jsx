import React, { useState } from 'react'
import Days from './Days'

export default function ProgramCard({header, cardBG, program}) {
    const [isVisible, setIsVisible] = useState(false);
    const [visibleWeeks, setVisibleWeeks] = useState({});

    const handleWeekClick  = (weekNumber) => {
        setVisibleWeeks(prev => ({
            ...prev,
            [weekNumber]: !prev[weekNumber]
        }));
    };
    
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
                <div className='flex flex-col bg-color-10-b gap-6 p-6'>
                    {program.weeklyProgram.map((week) => (
                        <div  key={week.weekNumber} className='flex flex-col bg-color-60 p-4 gap-4 border-2 border-color-30 rounded-lg'>
                            <div className='flex justify-between items-center  '>
                                <h3 className='text-2xl font-semibold text-color-30'>
                                    {week.weekNumber === 0 ? 'Base Week' : `Week ${week.weekNumber}`}
                                </h3>
                                <button 
                                    onClick={() => handleWeekClick(week.weekNumber)}
                                    className='px-3 py-1 rounded bg-color-10-a text-color-30 font-semibold
                                        hover:bg-color-30 hover:text-color-10-a hover:border hover:border-color-10-a'
                                >
                                    {visibleWeeks[week.weekNumber] ? 'Close' : 'View'}
                                </button>
                            </div>
                            {visibleWeeks[week.weekNumber] && (
                                <Days days={week.days} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}