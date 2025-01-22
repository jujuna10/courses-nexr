'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function page() {

    const [user,setUser] = useState({
            name: '',
            lastName: '',
            phone:'',
            age:'',
            email: ''
        })

    const router = useRouter()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:4001/registration',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            console.log('Success')
            setUser({
                name: '',
                lastName: '',
                phone:'',
                age:'',
                email: ''
            })
        }catch(error){
            console.error('Error:', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name,value} = e.target
            setUser(prev => ({
                ...prev,
                [name]: value
            }))
        }

    const routingToLogin = () => {
        router.push('/login')
    }


  return (
    <div className="bg-gradient-to-br from-[#111015] via-[#0c0c18] to-[#07081a] w-full h-screen flex justify-center items-center">
        <div className='w-[20%] px-5 bg-[#121212] shadow-[0px_0px_10px_rgb(100,100,100)] rounded-[5px] text-center py-5 flex flex-col gap-12'>
            <h1 className='text-white text-[20px]'>registration</h1>
            <form className='flex flex-col gap-5 justify-center w-full items-center' onSubmit={handleSubmit}>
                <div className='flex gap-12'>
                    <input type='text' name='name' placeholder='Your Name' className='w-[45%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} />
                    <input type='text' name='lastName' placeholder='Your lastname' className='w-[45%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} />
                </div>
                <div className='flex gap-12'>
                    <input type='number' name='phone' placeholder='Your Phone' className='w-[45%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} />
                    <input type='number' name='age' placeholder='Your Age' className='w-[45%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} />
                </div>
                <input type='email' name='email' placeholder='Your Email' className='w-[100%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} />
                <button className='w-[50%] py-2 bg-blue-700 rounded-[25px] text-white' type='submit'>Submit</button>
            </form>

            <p className='text-white text-[20px]'>Already have an <span className='text-blue-700 hover:underline hover:cursor-pointer' onClick={routingToLogin}>account?</span></p>
        </div>
    </div>
  )
}

export default page