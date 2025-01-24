'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useUrlParams } from '../contexts/urlContext'


interface Student {
  name: string;
  lastName: string;
}


interface UserInfo {
  name: string;
  lastName: string;
  phone: string;
  age: string;
  email: string;
  number: string;
  courses: { course_id: number }[];
  student?: Student
}



function page() {


    const [userInfo,setUserInfo] = useState<UserInfo | null>(null)
    const [settings,setSettings] = useState<boolean>(false)
    const [showDetail,setShowDetail] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')

    const router = useRouter()

    const { setUrlParams } = useUrlParams();
    useEffect(() => {
            if (userInfo) {
                console.log("Setting URL Params:", userInfo.name, userInfo.email);
                setUrlParams({
                    name: userInfo.name,
                    id: userInfo.number,
                });
            }
        }, [userInfo]);
    

    

      useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                console.error('ID is not available');
                return;
            }

            try {
                const response = await fetch(`http://localhost:4001/profile/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
      }, [id])

      useEffect(() => {
        console.log(userInfo, 'userinfo');
    }, [userInfo]);
    // console.log(userInfo.name,'name')
       
    const seetingsMenu = () => {
      setSettings(!settings)
    }

    const showDetails = () => {
      setShowDetail(!showDetail)
    }

    const logOut = () => {
      router.push('/login')
    }


    const routeToCourses = () => {
      if(userInfo){
        router.push(`/courses?name=${name}&id=${id}`)
      }
    }
    console.log(userInfo, 'userinfo')

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


    const coursesId = []
    coursesId.push(userInfo?.courses?.map(course => course.course_id - 1))
    console.log(coursesId, 'coursesId')
    console.log(userInfo?.courses?.map(course => course.course_id));


    const studentProperties = ['name', 'lastName', 'phone', 'age', 'email', 'number'];
    studentProperties.forEach(prop => {
      console.log(`${prop}: ${userInfo?.student?.[prop] || ''}`);
    });
  return (
      <div className='px-12 w-full h-screen bg-gradient-to-b from-[#111015] via-[#0c0c18] to-[#07081a]'>
        <p className='text-white' onClick={routeToCourses}>courses</p>
        <div>
          {/* name and lastname */}
            <div className='w-full flex flex-col gap-5 relative'>
              <div className='flex items-center justify-end gap-5'>
                <div className='flex gap-2 mt-5'>
                  <p className='text-white text-[18px]'>{userInfo?.name || ''}</p>
                  <p className='text-white text-[18px]'>{userInfo?.lastName || ''}</p>
                </div>
                <Image src='/user.png' width={100000} height={35} alt='user' className='border-[1px] border-black mt-5 invert rounded-[50%] p-2 w-[45px] h-[45px] hover:cursor-pointer' onClick={seetingsMenu} />
              </div>
            {
              settings && !showDetail && (
                <div className={`absolute top-20 text-right transition-all duration-500 ease-in-out ${settings ? 'right-0' : 'right-[-100%]'}`}>
                  <p className="text-white text-[18px] hover:cursor-pointer" onClick={showDetails}>Details</p>
                  <p className="text-white text-[18px] hover:cursor-pointer" onClick={logOut}>Log out</p>
                  <p className="text-white text-[18px] hover:cursor-pointer">Change details</p>
                </div>
              )
            }
            {
              settings && showDetail && (
                <div className={`absolute top-20 transition-all duration-500 ease-in-out ${settings ? 'right-0' : 'right-[-100%]'}`}>
                  <p className="text-white text-[18px]">Name: {userInfo?.name || ''}</p>
                  <p className="text-white text-[18px]">Lastname: {userInfo?.lastName || ''}</p>
                  <p className="text-white text-[18px]">Age: {userInfo?.age || ''}</p>
                  <p className="text-white text-[18px]">Email: {userInfo?.email || ''}</p>
                  <p className="text-white text-[18px]">Phone: {userInfo?.phone || ''}</p>
                  <p className="text-white text-[18px]">Number: {userInfo?.number || ''}</p>
                  <p className="text-white text-[18px] hover:cursor-pointer" onClick={() => setShowDetail(false)}>Main settings</p>
                </div>
              )
            }
            </div>
        </div>

        <div>
          {coursesId.map((item, index) => (
            <div key={index}>
              {item?.map(courseId => {
                const course = courses.find(course => course.id === courseId)
                return (
                  <div key={courseId} className="mb-4">
                    <p className="text-white">Course ID: {courseId}</p>
                    <p className="text-white">Course Name: {course?.name}</p>
                    <p className="text-white">Course Time: {course?.time}</p>
                    <p className="text-white">Course Status: {course?.status}</p>
                    <p className="text-white">Course Category: {course?.category}</p>
                    <p className="text-white">Course Teacher: {course?.teacher}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

      </div>
)
}

export default page