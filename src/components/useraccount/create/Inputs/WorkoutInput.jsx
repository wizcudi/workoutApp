import React from 'react'

export default function WorkoutInput({
    title, 
    placeholder,
    type="text",
    value,
    onChange
}) {
    return (
        <div className="flex flex-row items-center gap-2">
            <label className="text-lg font-semibold">{title}: </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="
                    text-lg caret-teal-500 outline-none focus:border-teal-500 transition-colors px-2
                    placeholder:text-gray-500 placeholder:text-sm placeholder:italic 
                "
                placeholder={placeholder}
            />        
        </div>
    )
}
