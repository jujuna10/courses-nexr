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
    console.log(id,'id')

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

    useEffect(() => {
      if(settings === false){
        setShowDetail(false)
      }
    },[settings, showDetail])

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


    const avgAttendance = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    const avgScore = Math.floor(Math.random() * (100 - 35 + 1)) + 35;
    const duration = Math.random() * (2 - 0.1) + 0.1;
    const roundedDuration = Math.round(duration * 10) / 10;
    const homework = Math.floor(Math.random() * (100 - 35 + 1)) + 35;
    console.log(typeof(roundedDuration));


    useEffect(() => {
      const fetchData = async () => {
          if (!id) {
              console.error('ID is not available');
              return;
          }

          try {
              const response = await fetch(`http://localhost:4001/statistic`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    id,
                    avgAttendance,
                    avgScore,
                    roundedDuration: parseFloat(roundedDuration.toFixed(1)),
                    homework,
                   }),
              });

          } catch (error) {
              console.error('Error:', error);
          }
      };

      fetchData();
    }, [id, avgAttendance, avgScore, roundedDuration, homework])

    useEffect(() => {
      const fetchData = async () => {
          if (!id) {
              console.error('ID is not available');
              return;
          }

          try {
              const response = await fetch(`http://localhost:4001/statistic/${id}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  }
              });

              const data = await response.json();
              console.log(data,'statistic')

          } catch (error) {
              console.error('Error:', error);
          }
      };

      fetchData();
    }, [id])


    return (
      <div className='px-12 w-full bg-gradient-to-b from-[#111015] via-[#0c0c18] to-[#07081a]'>
        <p className='text-white text-[20px] pt-5 hover:cursor-pointer' onClick={routeToCourses}>Buy course</p>
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
              {settings && !showDetail && (
                  <div className="absolute top-20 text-right transition-all duration-500 ease-in-out right-0">
                    <p className="text-white text-[18px] hover:cursor-pointer" onClick={showDetails}>Details</p>
                    <p className="text-white text-[18px] hover:cursor-pointer" onClick={logOut}>Log out</p>
                    <p className="text-white text-[18px] hover:cursor-pointer">Change details</p>
                  </div>
                )}
                {settings && showDetail && (
                  <div className="absolute top-20 transition-all duration-500 ease-in-out right-0">
                    {studentProperties.map((prop) => (
                      <p key={prop} className="text-white text-[18px]">
                        {`${prop.charAt(0).toUpperCase() + prop.slice(1)}: ${(userInfo?.student as any)?.[prop] || ''}`}
                      </p>
                    ))}
                    <p 
                      className="text-white text-[18px] hover:cursor-pointer" 
                      onClick={() => setShowDetail(false)}
                    >
                      Main settings
                    </p>
                  </div>
                )}
            </div>
        </div>

        <div className='flex w-full'>
          <div className='grid grid-cols-2 w-[50%]'>
            {coursesId.map((item, index) => (
              <div key={index}>
                {item?.map(courseId => {
                  const course = courses.find(course => course.id === courseId)
                  return (
                    <div key={courseId} className={`flex my-12 gap-5 w-[100%] py-4 px-5 border-[1px] border-gray-200 rounded-[10px] ${course?.category === 'Development' ? 'shadow-[0px_0px_10px_rgb(255,255,20)]' : course?.category === 'Design' ? 'shadow-[0px_0px_10px_rgb(0,0,255)]': 'shadow-[0px_0px_10px_rgb(255,255,255)]'}`}>
                      <div className='w-full flex flex-col gap-5'>
                          <p className='text-white text-center text-[20px]'>{course?.name} ({course?.category})</p>
                          <div className='flex justify-between'>
                              <p className='text-white'>{course?.time}</p>
                              <p className='text-white'>{course?.status}</p>
                          </div>
                          <p className='text-blue-500 hover:cursor-pointer'>Mentor: {course?.teacher}</p>
                          <p className='text-white'>Course level: {course?.level}</p>
                          <p className='text-white text-right'>Month: {course?.price}$</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
{/* ---------------------------------------------- */}

          <div>
            {/* statistic */}
            {/* attendance */}
            <div>

            </div>

            {/* scores */}
            <div>

            </div>
          </div>
        </div>

      </div>
)
}

export default page