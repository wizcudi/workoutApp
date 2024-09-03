import React from 'react'
import './Button.css'

export default function Button({onClick, children}) {
    return (
        <div className='buttonDiv'>
            <button onClick={onClick}>{children}</button>
        </div>
    )
}
