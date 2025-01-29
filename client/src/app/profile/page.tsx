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
type Stat = {
  student_id: string;
  attendances:string;
  scores:string;
  duration:number;
  homeworks:string
}




function page() {


    const [userInfo,setUserInfo] = useState<UserInfo | null>(null)
    const [settings,setSettings] = useState<boolean>(false)
    const [showDetail,setShowDetail] = useState<boolean>(false)
    const [courseIds, setCourseIds] = useState<number[]>([]);
    const [statisticData,setStatisticData] = useState<Stat[]>([])
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const studentName = searchParams.get('name')

    const router = useRouter()

    useEffect(() => {
      if (userInfo?.courses) {
        const ids = userInfo.courses.map(course => course.course_id - 1);
        setCourseIds(ids)
      }
    }, [userInfo]);
    

    const { setUrlParams } = useUrlParams();
    useEffect(() => {
            if (userInfo) {
                // console.log("Setting URL Params:", userInfo.name, userInfo.email);
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
        // console.log(userInfo, 'userinfo');
    }, [userInfo]);
       
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
        router.push(`/courses?name=${userInfo?.name}&id=${id}`)
      }
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


    const coursesId = []
    coursesId.push(userInfo?.courses?.map(course => course.course_id - 1))

    // const coursesId = userInfo?.courses?.map(course => course.course_id - 1) || [];


    const studentProperties = ['name', 'lastName', 'phone', 'age', 'email', 'number'];


    const avgAttendance = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    const avgScore = Math.floor(Math.random() * (100 - 35 + 1)) + 35;
    const duration = Math.random() * (2 - 0.1) + 0.1;
    const roundedDuration = Math.round(duration * 10) / 10;
    const homework = Math.floor(Math.random() * (100 - 35 + 1)) + 35;

    useEffect(() => {
      if (courseIds.length > 0) {
        const fetchData = async () => {
          if (!id || !userInfo) return;
          try {
            const response = await fetch(
              `http://localhost:4001/statistic/${id}/${avgAttendance}/${avgScore}/${roundedDuration}/${homework}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
              }
            );
            console.log(await response.json());
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchData();
      }
    }, [id, userInfo, courseIds]);
   


    useEffect(() => {
      const fetchData = async () => {
          if (!id) {
              console.error('ID is not available');
          }

          try {
              const response = await fetch(`http://localhost:4001/statistic/${id}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  }
              });

              const data = await response.json();
              // console.log(data,'statistic')
              setStatisticData(data);

          } catch (error) {
              console.error('Error:', error);
          }

      };

      fetchData();
    }, [id])

    console.log(statisticData)

    console.log(courseIds)

    const score:string = (statisticData[0]?.scores)

    const stats = [statisticData[0]?.attendances,statisticData[0]?.scores,statisticData[0]?.homeworks,statisticData[0]?.duration]
    const statsName = ['attendances','scores','homeworks','duration']


    const getColor = (score:number) => {
      if (score <= 50) return "red";
      if (score <= 70) return "yellow";
      return "green";
    }

    const radius:number = 45
    const circumference:number = 2 * Math.PI * radius;
    const progress:number = score ? (parseInt(score) / 100) * circumference : 0;



    return (
      <div className='px-12 w-full bg-gradient-to-b h-screen from-[#111015] via-[#0c0c18] to-[#07081a]'>
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

        <div className='flex w-full gap-20'>
            <div className="grid grid-cols-2 gap-6 mt-16">
            {coursesId.flat().map(courseId => {
              const course = courses.find(c => c.id === courseId);
              if (!course) return null;
              
              return (
                <div 
                  key={courseId} 
                  className={`flex flex-col p-5 border border-gray-200 rounded-lg `}
                >
                  <div className="flex flex-col gap-5 w-full">
                    <p className="text-white text-center text-xl">
                      {course.name} ({course.category})
                    </p>
                    <div className="flex justify-between">
                      <p className="text-white">{course.time}</p>
                      <p className="text-white">{course.status}</p>
                    </div>
                    <p className="text-blue-500 hover:cursor-pointer">
                      Mentor: {course.teacher}
                    </p>
                    <p className="text-white">Course level: {course.level}</p>
                    <p className="text-white text-right">Month: {course.price}$</p>
                  </div>
                </div>
              );
            })}
          </div>
{/* ---------------------------------------------- */}

          <div className='w-[50%]'>
            {/* statistic */}
            {/* score */}
            <div className='grid grid-cols-2 gap-16 mt-16'>
              {stats.map((item,index) => (
                <div key={index} className='bg-[rgb(37,30,35)] w-[100%] flex justify-center flex-col gap-5 items-center rounded-[10px] h-[200px]'>
                    <p className='text-white text-[20px]'>{statsName[index]}</p>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} strokeWidth="10" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke={getColor(Number(item))}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - progress}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="55" textAnchor="middle" fontSize="20" fill={getColor(Number(item))}>
                      {item}%
                    </text>
                </svg>
                </div>
              ))}
            </div>

            {/* attendance */}
            <div>

            </div>
          </div>
        </div>

      </div>
)
}

export default page