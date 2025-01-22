'use client';
import React, { useEffect, useState } from 'react'
import { useUrlParams } from '../contexts/urlContext'
import { useRouter, useSearchParams } from 'next/navigation';

function Page() {
    const [searchResult,setSearchResult] = useState<string>('All courses')
    const [sureOpen,setSureOpen] = useState<boolean>(false)
    const [sureAnswer,setSureAnswer] = useState<string>('')
    const [courseIndex,setCourseIndex] = useState(0)
    const router = useRouter();
    const { urlParams } = useUrlParams();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const name = searchParams.get('name');
        const id = searchParams.get('id');
        if (!name && !id && (urlParams.name || urlParams.id)) {
            router.push(`/profile?name=${urlParams.name}&id=${urlParams.id}`);
        }
    }, [urlParams, searchParams]);

    const name = searchParams.get('name');
    const userNumber = searchParams.get('id');
    console.log(name,'name')

    

    const send = async () => {
            try{
                const response = await fetch('http://localhost:4001/courses',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(courseInfo)
                })
                
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                
                const data = await response.json()
                console.log(data,'data')
                
                router.push(`/profile?name=${name}&id=${userNumber}`)
                

            }catch(error){
                console.error('Error:', error)
            }
        }

    const back = () => {
        router.push(`/profile?name=${urlParams.name}&id=${urlParams.id}`);
    }

    interface Course {
        id:number
        name: string;
        time: string;
        status: string;
        category: string;
        teacher: string;
        price:number;
        level:string;
    }
    
    const courses: Course[] = [
        { id: 1, name: 'Project Management', time: '3 hours', status: 'Offlain', category: 'Management', teacher: 'John Doe', price: 100, level:'pro' },
        { id: 2, name: 'UX/UI Design', time: '3 hours', status: 'Offlain/Onlain', category: 'Design', teacher: 'Emily Smith', price: 120, level:'pro' },
        { id: 3, name: 'Backend (Python)', time: '6 hours', status: 'Offlain', category: 'Development', teacher: 'David Brown', price: 200, level:'pro' },
        { id: 4, name: 'Frontned (JavaScript)', time: '6 hours', status: 'Offlain', category: 'Development', teacher: 'Sarah Johnson', price: 180, level:'pro' },
        { id: 5, name: 'IOS-Development', time: '6 hours', status: 'Offlain', category: 'Development', teacher: 'Michael Davis', price: 220, level:'pro' },
        { id: 6, name: 'Android-Development', time: '6 hours', status: 'Offlain', category: 'Development', teacher: 'Sophia Wilson', price: 220, level:'pro' },
        { id: 7, name: 'Testing', time: '3 hours', status: 'Offlain/Onlain', category: 'Development', teacher: 'Christopher Moore', price: 150, level:'pro' },
        { id: 8, name: 'Bootcamp', time: '3 hours', status: 'Offlain', category: 'Development', teacher: 'Olivia Garcia', price: 130, level:'pro' },
    ];

    type CoursesInfo = {
        id:number,
        name:string,
        time:string,
        status:string,
        category:string,
        teacher:string,
        price:number,
        level:string,
        userNumber?:number,
    }



    const courseInfo: CoursesInfo = {
        id: courses[courseIndex].id,
        name: courses[courseIndex].name,
        time: courses[courseIndex].time,
        status: courses[courseIndex].status,
        category: courses[courseIndex].category,
        teacher: courses[courseIndex].teacher,
        price: courses[courseIndex].price,
        level: courses[courseIndex].level,
        userNumber: userNumber !== null ? Number(userNumber) : 0,
    };
    
    
    const filtered = () => {
        if (searchResult === 'All courses' || searchResult === '') {
            return courses;
        } else {
            return courses.filter(course => course.category === searchResult || course.name === searchResult);
        }

    }

    const indexx = (indexOfCourse:number) => {
        setCourseIndex(indexOfCourse);
    }

    console.log(courseIndex,'course')

    console.log(userNumber,'userNumber')
    

    return (
        <div className='bg-gradient-to-b from-[#111015] via-[#0c0c18] to-[#07081a] relative overflow-hidden w-full h-screen p-5 flex flex-col gap-36'>
            <div>
                <input type="text" name="course" id="course" placeholder='Search course' className='w-full py-4 px-5 rounded-[20px] border-[1px] text-white border-blue-500 focus:border-[2px] focus:border-blue-700 bg-gray-500 bg-transparent focus:outline-none' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchResult(e.target.value)} />
            </div>
            <div className='grid grid-cols-3 gap-12 w-full ml-[3%]'>
                {
                    filtered().map((course, index) => (
                        <div key={index} className={`flex gap-5 w-[80%] py-4 px-5 border-[1px] border-gray-200 rounded-[10px] ${course.category === 'Development' ? 'shadow-[0px_0px_10px_rgb(255,255,20)]' : course.category === 'Design' ? 'shadow-[0px_0px_10px_rgb(0,0,255)]': 'shadow-[0px_0px_10px_rgb(255,255,255)]'}`}>
                            <div className='w-full flex flex-col gap-5'>
                                <p className='text-white text-center text-[20px]'>{course.name} ({course.category})</p>
                                <div className='flex justify-between'>
                                    <p className='text-white'>{course.time}</p>
                                    <p className='text-white'>{course.status}</p>
                                </div>
                                <p className='text-blue-500 hover:cursor-pointer'>Mentor: {course.teacher}</p>
                                <p className='text-white'>Course level: {course.level}</p>
                                <p className='text-white text-right'>Month: {course.price}$</p>
                                <div className='flex justify-center'>
                                    <button className='text-white hover:bg-blue-500 transition-all duration-200 w-[35%] px-5 rounded-[10px]' onClick={() => {indexx(course.id); setSureOpen(!sureOpen)}}>Buy Course</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                sureOpen && (
                    <div className='absolute top-[0%] left-[0%] w-full h-screen bg-black bg-opacity-60 z-50 flex justify-center items-center'>
                        <div className='flex flex-col gap-5 justify-center items-center'>
                            <p className='text-white'>Are you sure?</p>
                            <div className='flex gap-5 items-center'>
                                    <button className='text-white hover:bg-white hover:text-black px-2 py-1 rounded-[5px]' onClick={(e) => {setSureOpen(false); setSureAnswer('yes'); send();}}>Yes</button>
                                    <button className='text-white hover:bg-white hover:text-black px-2 py-1 rounded-[5px]' onClick={() => {setSureOpen(false); setSureAnswer('no')}}>No</button>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    )
}

export default Page;