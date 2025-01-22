import React from 'react'
import Image from 'next/image'

function Prices() {

    type Conditions = {
        days:string,
        time:string,
        mentor:string,
        durations:string
    }

    const ConditionItem = ({ text }: { text: string }) => (
      <div className="flex items-center gap-2 text-white">
          <Image src='/done.png' width={20} height={20} alt='done' className='bg-green-500 rounded-[50%] w-[20px] h-[20px] p-1' />
          <p>{text}</p>
      </div>
  );

    const prices:string[] = ['100$','200$','400$']
    const status:string[] = ['Basic','Standard','Premium']

    const conditions:Conditions[] = [
      {days:'Days not optional',time:'Time not optional',mentor:'Only one mentor',durations:'Duration 2 year'},
      {days:'Days optional',time:'Time not optional',mentor:'Mentor + personal assistant',durations:'Duration 1 year'},
      {days:'Days optional',time:'Time optional',mentor:'Mentor + personal assistant',durations:'Duration 1 year'}
    ]

  return (
    <div className='grid grid-cols-3 w-full justify-items-center bg-gradient-to-b from-[#111015] via-[#0c0c18] to-[#07081a] pt-12 pb-12'>
      {status.map((item:string,index:number) => (
        <div key={index} className='w-[45%] flex flex-col bg-[#07081a] py-5 rounded-[25px] pl-7'>
          <div className='flex flex-col items-center gap-5 w-[80%]'>
            <p className='text-white text-[22px]'>{item}/<span className='font-bold'>{prices[index]}</span></p>
            <button className='w-[80%] shadow-[0px_0px_10px_rgb(255,255,25)] text-white rounded-[20px] py-2 hover:shadow-[0px_0px_10px_rgb(255,255,255)] transition-all duration-500'>Buy course</button>
            <hr className='w-[100%] h-[1px]' />
          </div>
          <div className='mt-8 flex flex-col gap-4'>
          <ConditionItem text={conditions[index].days} />
          <ConditionItem text={conditions[index].time} />
          <ConditionItem text={conditions[index].mentor} />
          <ConditionItem text={conditions[index].durations} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Prices