import React from 'react'

export default function Button({
    type="button",
    onClick,
    btnText, 
    bgColor, 
    btnBorder,
    btnTextStyle,
    hoverColor= "hover:bg-color-30",
    hoverText= "hover:text-white", 
    activeColor,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                rounded-md
                shadow
                w-full
                text-center
                px-4
                py-2
                cursor-pointer
                ${btnBorder}
                ${bgColor}
                ${hoverColor}
                ${hoverText}
                ${btnTextStyle}
                ${activeColor}
            `}
        >
            {btnText}
        </button>
    )
}
