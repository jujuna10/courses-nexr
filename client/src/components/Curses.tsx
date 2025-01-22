'use client'
import React, { useState } from 'react'
import py from '../../public/py.png'
import js from '../../public/js.png'
import ios from '../../public/py.png'
import android from '../../public/android.png'
import test from '../../public/test.png'
import bootstrap from '../../public/bootstrap.png'
import puzzle from '../../public/puzzle.png'
import screen from '../../public/screen.png'


import Image from 'next/image'


function Curses() {

    const [selectedCategory, setSelectedCategory] = useState('All Course');
    const images = [screen,puzzle,py,js,ios,android,test,bootstrap]

    type Course = {
        name: string;
        time: string;
        status: string;
        category: string;
      };


    const courses:Course[] = [
        {name:'Project Management',time:'3 hours',status:'Offlain',category:'Management'},
        {name:'UX/UI Design',time:'3 hours',status:'Offlain/Onlain',category:'Design'},
        {name:'Backend (Python)',time:'6 hours',status:'Offlain',category:'Development'},
        {name:'Frontned (JavaScript)',time:'6 hours',status:'Offlain',category:'Development'},
        {name:'IOS-Development',time:'6 hours',status:'Offlain',category:'Development'},
        {name:'Android-Development',time:'6 hours',status:'Offlain',category:'Development'},
        {name:'Testing',time:'3 hours',status:'Offlain/Onlain',category:'Development'},
        {name:'Bootcamp',time:'3 hours',status:'Offlain',category:'Development'},
    ]

    const filterCourses = () => {
        return selectedCategory === 'All Course' ? courses : courses.filter((course) => course.category === selectedCategory)
    }

  return (
    <div className='flex flex-col items-center gap-20 pb-20'>
        <div className='flex flex-col justify-center items-center gap-12 mt-16'>
            <h1 className='text-white text-[32px]'>Courses</h1>
            <div className='flex gap-5'>
                <button className='text-white border-[1px] border-green-600 shadow-[0px_0px_15px_rgb(0,100,0)] rounded-[10px] px-5 py-1' onClick={() => setSelectedCategory('All Course')}>All Course</button>
                <button className='text-white border-[1px] border-blue-800 shadow-[0px_0px_15px_rgb(0,0,200)] rounded-[10px] px-5 py-1' onClick={() => setSelectedCategory('Development')}>Development</button>
                <button className='text-white border-[1px] border-yellow-600 shadow-[0px_0px_15px_rgb(200,200,2)] rounded-[10px] px-5 py-1' onClick={() => setSelectedCategory('Design')}>Design</button>
                <button className='text-white border-[1px] border-green-400 shadow-[0px_0px_15px_rgb(0,120,0)] rounded-[10px] px-5 py-1' onClick={() => setSelectedCategory('Management')}>Management</button>
            </div>
        </div>

        <div className='w-full grid grid-cols-4 gap-y-16 justify-center items-center pl-28'>
            {filterCourses().map((item:Course,index:number) => (
                <div key={index} className='relative bg-gradient-to-br from-[#111842] to-[rgb(24, 12, 52)] w-[65%] h-[290px] rounded-[10px] flex flex-col pl-12 pt-16'>
                    <div className='absolute top-[-12%] left-[35%] w-[90px] h-[90px] border-b-[1px] border-b-blue-700 rounded-[50%] bg-gradient-to-br from-[#0e0e16] to-[#0d0d17] px-5 py-5'>
                        <Image src={images[index]} width={10000000} height={100} alt='courses' />
                    </div>
                    <p className='text-white text-[20px] font-semibold'>{item.name}</p>
                    <hr className='ml-5 bg-gray-700 h-[1px] my-5 w-[70%]' />
                    <div className='flex gap-[25%] w-full'>
                        <div>
                            <Image src='/clock.png' width={55} height={55} alt='clock' />
                            <p className='text-white'>{item.time}</p>
                        </div>
                        <div className='w-[35%]'>
                            <Image src='/man.png' width={55} height={55} alt='clock' />
                            <p className='text-white max-w-[58px] break-words'>{item.status}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Curses