'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUrlParams } from '../contexts/urlContext'

function page() {

    
    const [userLogin,setUserLogin] = useState({
        name: '',
        email: ''
    })
    const router = useRouter()
    const { setUrlParams } = useUrlParams();

    // useEffect(() => {
    //     if (userLogin.name && userLogin.email) {
    //         console.log("Setting URL Params:", userLogin.name, userLogin.email);
    //         setUrlParams({
    //             name: userLogin.name,
    //             id: userLogin.email,
    //         });
    //     }
    // }, [userLogin, setUrlParams]);
    


    

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:4001/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userLogin)
            })
            const data = await response.json()
    
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            
            router.push(`/profile?name=${data.name}&id=${data.number}`)
            
            setUserLogin({
                name: '',
                email: ''
            })
        }catch(error){
            console.error('Error:', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name,value} = e.target
            setUserLogin(prev => ({
                ...prev,
                [name]: value
            }))
        }

    const routingToLogin = () => {
        
    }


  return (
    <div className="bg-gradient-to-br from-[#111015] via-[#0c0c18] to-[#07081a] w-full h-screen flex justify-center items-center">
        <div className='w-[20%] px-5 bg-[#121212] shadow-[0px_0px_10px_rgb(100,100,100)] rounded-[5px] text-center py-5 flex flex-col gap-12'>
            <h1 className='text-white text-[20px]'>registration</h1>
            <form className='flex flex-col gap-5 justify-center w-full items-center' onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Your Name' className='w-[100%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} />
                <input type='email' name='email' placeholder='Your Email' className='w-[100%] py-3 rounded-[25px] border-[2px] px-5 border-blue-950 duration-500 text-white bg-transparent focus:border-[3px] focus:border-blue-950 focus:outline-none active:bg-transparent focus:bg-transparent hover:bg-transparent' onChange={handleChange} />
                <button className='w-[50%] py-2 bg-blue-700 rounded-[25px] text-white' type='submit'>Submit</button>
            </form>

            <p className='text-white text-[20px]'>Already have an <span className='text-blue-700 hover:underline hover:cursor-pointer'>account?</span></p>
        </div>
    </div>
  )
}

export default page