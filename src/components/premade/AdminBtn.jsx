import React from 'react'
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// export default function AdminBtn({
//     type="button",
//     onClick,
//     btnText, 

//     bgColor="bg-red-500", 
//     btnBorder,
//     btnTextStyle,
//     hoverColor="hover:bg-color-30",
//     hoverText="hover:text-white", 
//     activeColor,
// }) {
//     return (
//         <button
//             type={type}
//             onClick={onClick}
//             className={`
//                 rounded-md
//                 shadow
//                 w-full
//                 text-center
//                 px-4
//                 py-2
//                 cursor-pointer
//                 ${btnBorder}
//                 ${bgColor}
//                 ${hoverColor}
//                 ${hoverText}
//                 ${btnTextStyle}
//                 ${activeColor}
//             `}
//         >
//             {btnText}
//         </button>
//     )
// }

export default function AdminBtn({
    type = "button",
    onClick,
    btnText,
    bgColor ="bg-color-30",
    btnBorder="hover:border-2 hover:border-color-30",
    btnTextStyle="text-color-10-b",
    hoverColor = "hover:bg-color-10-a",
    hoverText = "hover:text-color-30",
    activeColor,
    // disabled,
}) {
    const [user] = useAuthState(auth);
    
    // If the button is already disabled via props, keep it disabled
    // Otherwise, disable it if there's no user
    // const isDisabled = disabled || !user;

    const handleClick = (e) => {
        if (!user) {
            alert('Please sign in to use this feature');
            return;
        }
        onClick?.(e);
    };

    return (
        <button
            type={type}
            onClick={handleClick}
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
            {/* {!user ? 'Sign in required' : btnText} */}
            {btnText}
        </button>
    );
}