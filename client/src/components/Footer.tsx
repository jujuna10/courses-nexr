import React from 'react'
import Image from 'next/image'
import phone from '../../public/phone.png'
import gmail from '../../public/gmail-logo.png'
import whatsapp from '../../public/whatsapp.png'
import location from '../../public/location.png'
import fb from '../../public/fb.png'
import instagram from '../../public/instagram.png'
import tiktok from '../../public/tik-tok.png'
import twitter from '../../public/twitter.png'
import linkedin from '../../public/linkedin-logo.png'





function Footer() {

    const images = [phone,gmail,whatsapp,location]
    const contact:string[] = ["+996 500 431 430","+996 505 431 430","info@codify.com","New-york"]
    const images2 = [fb,instagram,tiktok,twitter,linkedin]

  return (
    <div className='bg-[rgb(10,10,36)] flex justify-around py-5'>
        <div className='flex flex-col gap-7'>
            <h1 className='text-white text-[20px]'>Codify Academy</h1>
            <div>
                <p className='text-gray-400'>Adults course</p>
                <p className='text-gray-400'>Kids course</p>
            </div>
        </div>

        <div className='flex flex-col gap-7'>
            <h1 className='text-white text-[20px]'>Our project</h1>
            <div>
                <p className='text-gray-400'>Codify Teens</p>
                <p className='text-gray-400'>Codify LMS/CRM</p>
                <p className='text-gray-400'>Codify Lab</p>
                <p className='text-gray-400'>Codify Home</p>
            </div>
        </div>

        <div className='flex flex-col gap-7'>
            <h1 className='text-white text-[20px]'>Contact</h1>
            <div className='flex flex-col gap-4'>
                {contact.map((item:string, index:number) => (
                    <div key={index} className='flex gap-5'>
                        <Image src={images[index]} width={20} height={20} alt='contact' className='invert' />
                        <p className='text-gray-400'>{item}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className='flex flex-col gap-4'>
            {images2.map((item,index) => (
                <a href="#" key={index}>
                    <Image src={item} width={30} height={30} alt='social' className='invert' />
                </a>
            ))}
        </div>
    </div>
  )
}

export default Footer