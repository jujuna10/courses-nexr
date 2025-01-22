import React from 'react'
import Image from 'next/image'

function HeroSection() {
  return (
    <div className='flex items-center justify-center gap-[5%] w-full'>
        <div className='flex justify-center flex-col gap-5'>
            <p className='text-gray-300 text-[35px] max-w-[45%]'>Master an in-demand <span className='text-yellow-200'>IT profession</span> and start earning</p>
            <div className='flex gap-5'>
              <button className='bg-blue-700 px-12 shadow-[0px_0px_10px_rgb(70,70,70)] rounded-[20px] text-white py-1 text-[18px] hover:shadow-[0px_0px_20px_rgb(70,70,70)] transition-all duration-500'>Get consultation</button>
              <button className='border-[1px] border-blue-600 rounded-[20px] py-1 px-12 text-white text-[18px] hover:shadow-[0px_0px_20px_rgb(0,0,200)] transition-all duration-500'>Take test</button>
            </div>
        </div>
        <Image src='/earth.png' width={320} height={320} alt='earth' />

    </div>
  )
}

export default HeroSection