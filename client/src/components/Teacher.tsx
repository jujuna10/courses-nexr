'use client'
import React from 'react'
import py from '../../public/py.png'
import js from '../../public/js.png'
import ios from '../../public/ios.png'
import android from '../../public/android.png'
import test from '../../public/test.png'
import bootstrap from '../../public/bootstrap.png'
import puzzle from '../../public/puzzle.png'
import screen from '../../public/screen.png'
import teacher1 from '../../public/teacher1.jpg'
import teacher2 from '../../public/teacher2.jpg'
import teacher3 from '../../public/teacher3.jpeg'
import teacher4 from '../../public/teacher4.jpeg'
import teacher5 from '../../public/teacher5.jpg'
import teacher6 from '../../public/teacher6.png'


import Image from 'next/image'


function Teacher() {
    const images = [teacher1, teacher2, teacher3, teacher4, teacher5, teacher6];


    const text = [
          "The Python teacher will guide you through programming basics, data analysis, web development, and automation techniques. The course covers libraries like NumPy, Pandas, and Flask. Project: A small web app or data analysis tool.",
          "The JavaScript teacher will teach you modern web technologies, including React and Node.js. The course focuses on creating dynamic websites and applications. Project: An interactive web page.",
          "The UI/UX teacher will teach you design fundamentals, user research, and prototyping techniques using Figma. Project: A modernized mobile app design.",
          "The iOS and Android development teacher will teach you Swift and Kotlin to build mobile applications. Project: A basic functional mobile app.",
          "The Bootstrap teacher will show you how to create responsive and aesthetically pleasing websites. Project: A multi-page responsive website.",
          "The Testing and Management teacher will teach you QA fundamentals, test automation, and agile project management. Project: A test plan and report for a software application."
        ];

    const images2 = [py,js,puzzle,ios,android,bootstrap,test]

    const experiences = [
      { year: 2, company: "Python Institute" },
      { year: 12, company: "JavaScript Academy" },
      { year: 6, company: "Design Studio" },
      { year: 8, company: "Mobile Dev Hub" },
      { year: 14, company: "Bootstrap Labs" },
      { year: 5, company: "QA Masters" },
    ];
    



      type Teacher = {
        name: string,
        lastName: string
      }
      const names:Teacher[] = [
        { name: "John", lastName: "Smith" },
        { name: "Michael", lastName: "Johnson" },
        { name: "David", lastName: "Williams" },
        { name: "James", lastName: "Brown" },
        { name: "Robert", lastName: "Taylor" },
        { name: "Emily", lastName: "Davis" }
      ];

      const courses:string[] = [
        'Python developer',
        'Js developer',
        'UI/UX',
        'Ios and android development',
        'Bootstrap',
        'Testing',
    ]

  return (
    <div className='flex flex-col items-center gap-20 pb-20 bg-gradient-to-b from-[#111015] via-[#0c0c18] to-[#07081a]'>
        <div className='flex flex-col justify-center items-center gap-12 mt-16'>
            <h1 className='text-white text-[32px]'>Our Mentor</h1>
        </div>

        <div className='w-full grid grid-cols-3 gap-y-16 justify-center items-center pl-28'>
            {names.map((item:Teacher,index:number) => (
                <div key={index} className='relative bg-gradient-to-br from-[#111842] to-[rgb(24, 12, 52)] w-[65%] h-[350px] rounded-[10px] flex flex-col gap-4 pl-12 pt-16'>
                    <div className='absolute top-[-12%] left-[35%] w-[90px] h-[90px] border-b-[1px] border-b-blue-700 rounded-[50%] bg-gradient-to-br from-[#0e0e16] to-[#0d0d17] flex justify-center items-center'>
                        <Image src={images[index]} width={100} height={100} alt='courses' className='w-[90%] h-[80px] rounded-[50%]' />
                    </div>
                    <div className='flex gap-2 ml-[20%]'>
                      <p className='text-white text-[20px] font-semibold'>{item.name}</p>
                      <p className='text-white text-[20px] font-semibold'>{item.lastName}</p>
                    </div>
                    <hr className='ml-5 bg-gray-700 h-[1px] my-5 w-[70%]' />
                    <div className='flex flex-col gap-7 justify-center w-full'>
                        <div className='flex items-center gap-5'>
                            <Image src={images2[index]} width={55} height={55} alt='clock' />
                            <p className='text-white max-w-[45%]'>{courses[index]}</p>
                        </div>
                        <div className='w-[80%]'>
                            <div>
                              <p className='text-gray-400'>Work exeriences: {experiences[index].year}</p>
                              <p className='text-gray-400'>Work companie: {experiences[index].company}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Teacher