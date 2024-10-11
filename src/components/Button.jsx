import React from 'react'

export default function Button({onClick, children}) {
    return (
        <div className='flex justify-center px-5'>
            <button 
                onClick={onClick}
                className="w-full px-6 py-4 text-lg font-semibold uppercase border-2 border-black rounded-lg bg-blue-600 text-black hover:bg-blue-800 cursor-pointer"
            >
                {children}
            </button>
        </div>
    )
}
