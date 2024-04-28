import { getByUserId } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import HeaderLabel from '../_components/HeaderLabel'
import { FcEditImage } from "react-icons/fc";
import { FaCoins } from "react-icons/fa";

const ProfilePage = async() => {

  const {userId} = auth()

  if(!userId) redirect("/sign-in");

  const user = await getByUserId(userId);

  console.log(user)

  return (
  <>
  <HeaderLabel title='Profile' />

  <section className='mt-2 flex flex-col gap-5 sm:flex-row'>

    <div className='w-full rounded-lg border-2 bg-white p-5 shadow-lg'>
      <p className='text-2xl font-semibold'>CREDITS AVAIBLE</p>
      <div className='mt-4 flex items-center gap-4'>
        <FaCoins className='text-5xl text-yellow-600'/>
        <h2 className='font-semibold text-2xl text-slate-700'>{user?.creditBalance}</h2>

      </div>

    </div>

    <div className='w-full rounded-lg border-2 bg-white p-5 shadow-lg'>
      <p className='text-2xl font-semibold'>IMAGE MANIPULATION</p>
      <div className='mt-4 flex items-center gap-4'>
        <FcEditImage className='text-5xl'/>
        <h2 className='font-semibold text-2xl text-slate-700'>   / //</h2>

      </div>

    </div>



  </section>
  
  
  </>
  )
}

export default ProfilePage