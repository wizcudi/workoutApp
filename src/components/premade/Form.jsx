import React, { useState } from 'react'
import Button from './Button'


export default function Form({heading, buttonText, onSubmit}) {

    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        // console.log('Form submitted', formData);

        try {
            await onSubmit(formData);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    
    return (
        <form 
            onSubmit={handleSubmit}
            className='
                min-h-96
                max-w-96
                w-full
                
                flex
                flex-col
                justify-center
                p-10
                gap-10
                border-2
                border-teal-700
            '
        >
            <h2 className='
                text-5xl
                text-teal-700
                font-bold
                text-center
            '>
                {heading}
            </h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded ">
                    {error}
                </div>
            )}

            <input 
                className='
                    h-12
                    rounded
                    p-2
                    border-2
                    text-xl
                    border-teal-700
                    focus:border-blue-700
                    focus:outline-none
                '
                type='email' 
                name='email' 
                value={formData.email} 
                onChange={handleChange}
                placeholder='Email'
                required
            />
            <input 
                className='
                    h-12
                    rounded
                    p-2
                    border-2
                    text-xl
                    border-teal-700
                    focus:border-blue-700
                    focus:outline-none
                '
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                required
            />

            
            <Button 
                type='submit'
                btnText={buttonText}
                btnBorder='border-2 border-teal-700'
                hoverColor='hover:bg-teal-700'
                hoverText='hover:text-white'
                btnTextStyle='text-teal-700 font-bold text-xl uppercase'
            />
        </form>
    )
}

