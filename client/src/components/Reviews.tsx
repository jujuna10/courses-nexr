'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import man1 from '../../public/man1.webp'
import man2 from '../../public/man2.jpg'
import man3 from '../../public/man3.jpg'
import man4 from '../../public/man4.webp'
import man5 from '../../public/man5.jpeg'
import women1 from '../../public/women1.jpeg'
import women2 from '../../public/women2.jpeg'




function Reviews() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [man1, man2, man3, man4, man5, women1, women2];
    const text:string[] = [
        "Learn Python with hands-on projects and expert support for a strong programming foundation.",
        "Master JavaScript and build interactive web applications step by step with industry experts.",
        "Unlock your creative potential with comprehensive design courses for stunning user interfaces.",
        "Boost your skills in an immersive bootcamp designed to prepare you for the tech industry.",
        "Ensure software quality with our in-depth courses on testing tools and methodologies.",
        "Develop sleek iOS apps with Swift, focusing on functionality and seamless user experiences.",
        "Create modern Android applications with Kotlin or Java, tailored to meet industry demands."
      ];
      const names = ["John Smith", "Michael Johnson", "David Brown", "Robert Davis", "James Wilson", "Emily Clark", "Sophia Martinez"];

      
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
      }
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
      }
      const getVisibleSlides = () => {
        const lastIndex = images.length - 1;
        const prev = currentIndex === 0 ? lastIndex : currentIndex - 1;
        const next = currentIndex === lastIndex ? 0 : currentIndex + 1;
        return [prev, currentIndex, next]
      }
    
      const [prev, current, next] = getVisibleSlides()
  return (
    <div className="flex items-center justify-center w-full py-12 bg-gradient-to-b from-[#111015] via-[#0c0c18] to-[#07081a]">
      <Image src='/arrow.png' width={35} height={35} alt='prev' className='rotate-[90deg] w-[50px] h-[50px] invert' onClick={prevSlide} />
      <div className="flex items-center justify-center h-full">
        <div className="mx-2 transition-all duration-500 transform scale-75 opacity-50">
          <Image src={images[prev]} alt="Previous" className="rounded-lg object-cover w-[300px] h-[200px]"/>
        </div>

        <div className="mx-2 transition-all duration-500 transform scale-100 z-10 bg-white pb-5 w-[28%] mt-12 flex flex-col gap-5 rounded-[20px]">
          <Image src={images[current]} alt="Current" className="rounded-lg object-cover w-[400px] h-[300px]" />
          <p className='text-center'>"{text[current]}"</p>
          <p className='text-right pr-5 font-bold'>{names[current]}</p>

        </div>

        <div className=" mx-2 transition-all duration-500 transform scale-75 opacity-50">
          <Image src={images[next]} alt="Next" className="rounded-lg object-cover w-[300px] h-[200px]" />
        </div>

      </div>
      <Image src='/arrow.png' width={35} height={35} alt='next' className='rotate-[270deg] w-[50px] h-[50px] duration-500 invert' onClick={nextSlide} />
    </div>
  )
}

export default Reviews