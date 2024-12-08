import React from 'react'
import CardHeader from './CardHeader'
import CardContent from './CardContent'

export default function Card() {
    return (
        <div className=' 
            w-4/5 max-600:w-full max-w-[600px] mx-auto rounded-md py-10 px-6    
            flex flex-col gap-4
            bg-color-10-b
        '>
            <CardHeader />
            <CardContent /> 
        </div>
    )
}
