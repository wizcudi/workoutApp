import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Card({header, cardBG, img, to}) {

    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    };

    return (
        <div 
            onClick={handleClick}
            className={`
                flex
                sm:flex-col
                sm:justify-center
                items-center
                gap-4
                p-4
                cursor-pointer
                shadow-md
                sm:max-w-[48%]
                sm:h-[175px]
                w-full
                rounded
                ${cardBG}
            `}
        >
            {
                img &&<img 
                    src={img} 
                    alt={header}
                    className="
                        w-12 
                        h-12
                        
                    " 
                />
            }
            <h2
                className='
                    text-zinc-800
                    text-2xl
                    font-semibold
                '
            >
                {header}
            </h2>
        </div>
    )
}
