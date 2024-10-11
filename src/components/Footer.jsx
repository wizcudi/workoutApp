import React from 'react'

export default function Footer() {
    return (
        <div 
            className="
                flex
                justify-center
                p-5 
                w-full 
                capitalize 
                font-bold 
                bg-stone-200 
                border-t-2 
                border-black
            "
        >
            <h2>
                Made with ❤️ by
                <a 
                    href="https://www.instagram.com/thankyouamour/" 
                    target="_blank" 
                    className="ml-2 lowercase"
                >
                    thankyouamour
                </a>
            </h2>
        </div>
    )
}
