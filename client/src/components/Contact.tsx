'use client'
import React, { useState } from 'react'

function Contact() {

    const [contactData,setContactData] = useState({
        name: '',
        phone: '',
        email: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4001/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
    
            console.log('success');
            setContactData({
                name: '',
                phone: '',
                email: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setContactData(prev => ({
            ...prev,
            [name]: value
        }))
    }

  return (
    <div className='bg-[#121212] py-7 flex flex-col gap-12'>
        <h1 className='text-center text-white text-[22px]'>Consulatation</h1>
        <div className='flex justify-center'>
            <form className='flex gap-12' onSubmit={handleSubmit}>
                <input type='name' name='name' placeholder='Your Name' className='w-[33%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} value={contactData.name} />
                <input type='number' name='phone' placeholder='Your Phone' className='w-[33%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} value={contactData.phone} />
                <input type='email' name='email' placeholder='Your Email' className='w-[33%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} value={contactData.email} />
                <button className='w-[20%] bg-blue-700 rounded-[25px] text-white' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Contact