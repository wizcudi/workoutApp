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
        <div className='flex justify-center items-center'>
        <form 
            onSubmit={handleSubmit}
            className='
                min-h-96 max-w-96 w-full
                flex flex-col justify-center
                py-10 px-8 gap-10 border-2
                bg-color-10-b border-color-30 
            '
        >
            <h2 className='
                text-4xl font-bold text-center text-color-30 capitalize
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
                    h-12 rounded p-2 border-2 text-lg border-color-30
                    focus:border-color-10-a
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
                    h-12 rounded p-2 border-2 text-lg border-color-30
                    focus:border-color-10-a
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
                bgColor='bg-color-10-a'
                btnBorder='border-2 border-color-10-a'
                hoverColor='hover:bg-color-30'
                hoverText='hover:text-color-10-a'
                btnTextStyle='text-color-30 font-bold text-lg uppercase'
            />
        </form>
        </div>
    )
}

