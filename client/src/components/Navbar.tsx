'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function Navbar() {

    const navbarText:string[] = ['Courses','Mentors','Prices','Contact']

    const route = useRouter()

    const registrationPage = () => {
        route.push('/registration')
    }

  return (
    <div className='w-full pt-5'>
        <div className='flex justify-around'>
            <div className='flex gap-24 items-center'>
                <h1 className='text-blue-800 text-[32px] font-mono'>CODIFY</h1>
                <div className='flex gap-5'>
                    {navbarText.map((item:string,index:number) => (
                        <p key={index} className=' text-[20px] text-gray-300'>{item}</p>
                    ))}
                </div>
            </div>
            <div className='flex gap-12'>
                <button className='border-[1px] border-yellow-500 rounded-[20px] px-20 py-1 text-white text-[20px] shadow-[0px_0px_10px_rgb(255,255,25)] hover:shadow-[0px_0px_10px_rgb(255,255,255)] transition-all duration-500'>Call us</button>
                <button className='border-[1px] border-yellow-500 rounded-[20px] px-20 py-1 text-white text-[20px] shadow-[0px_0px_10px_rgb(255,255,25)] hover:shadow-[0px_0px_10px_rgb(255,255,255)] transition-all duration-500' onClick={registrationPage}>Join Now</button>
            </div>

        </div>
    </div>
  )
}

export default Navbar