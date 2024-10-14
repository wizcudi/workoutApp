import React from 'react'

export default function Button({onClick, children}) {
    return (
        <button 
            onClick={onClick}
            className="
                w-full 
                px-6
                py-2 
                text-lg 
                font-semibold 
                uppercase 
                border-2 
                border-black 
                rounded
                bg-blue-600 
                text-black 
                hover:bg-blue-700 
                cursor-pointer
            "
        >
            {children}
        </button>
    )
}
