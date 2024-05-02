import { getByUserId } from '@/actions/user';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import HeaderLabel from '../_components/HeaderLabel';
import { plans } from '@/constans';
import { FiCalendar, FiCheck, FiX } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { SignedIn } from '@clerk/nextjs';
import Checkout from '../_components/Checkout';

const CreditsPage = async() => {

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getByUserId(userId);


  return (
   <>
   <HeaderLabel
   title='Buy Credits'
   subtitle='Choese a credit package'
   />

   <section>
    <ul className='mt-11 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 '>
      {plans.map((plan)=>(
        <li className='w-full rounded-xl border-2 bg-white p-8 shadow-xl' key={plan._id}>
          <div className='flex items-center justify-center flex-col gap-4'>
            <FiCalendar size={40}/>
            <p className='font-semibold mt-2 text-2xl text-purple-600'>
              {plan.name}
            </p>
            <p className='mt-2 font-semibold'>
               ${plan.price}
            </p>
            <p>
               {plan.credits} Credits
            </p>


          </div>

          <ul className='flex flex-col gap-5 p-2 px-2 mt-8'>
            {plan.inclusions.map((inclusion)=>(
              <li key={plan._id + inclusion.label}
              className='flex items-center gap-4'>
                
                {inclusion.isIncluded ? <FiCheck size={24}/> : <FiX size={24} />}
                <p className='font-semibold'>{inclusion.label}</p>

              </li>
            ))}

            
          </ul>


        <div className='mt-10'>


          {plan.name === "Free" ? (
          <Button variant="outline">
            Free
          </Button>

          ):
          (
           <SignedIn>
            <Checkout
            amount={plan.price}
            buyerId={user?.id}
            credits={plan.credits}
            plan={plan.name}

            />
           </SignedIn>
          )
          
          }
          </div>


        </li>
      ))}

    </ul>
     </section>
   
   </>
  )
}

export default CreditsPage