import React from 'react'

export default function WorkoutInput({
    title, 
    placeholder,
    type="text",
    value,
    onChange
}) {
    return (
        <div className="items-center w-full">
            <label className="text-lg font-semibold ">{title}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="
                    text-lg caret-color-30 outline-none focus:border-color-30 transition-colors w-full px-2
                    placeholder:text-gray-500 placeholder:text-sm placeholder:italic border-b border-color-30
                "
                placeholder={placeholder}
            />        
        </div>
    )
}
