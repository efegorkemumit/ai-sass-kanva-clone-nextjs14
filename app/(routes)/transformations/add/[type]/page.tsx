import { getByUserId } from '@/actions/user';
import HeaderLabel from '@/app/(routes)/_components/HeaderLabel';
import TransformationForm from '@/app/(routes)/_components/TransformationForm';
import { transformationTypes } from '@/constans';
import { TransformationTypeKey } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'


interface AddTSTypePageProps{
    params:{
        type:string;
    }
}
const AddTSTypePage = async({params}:AddTSTypePageProps) => {

    const {userId} = auth();
    if(!userId) redirect("/sign-in")
    const transformation = transformationTypes[params.type]

    const user  = await getByUserId(userId)


  return (
  <>
  <HeaderLabel
  title={transformation.title}
  subtitle={transformation.subTitle}
  />

  <section className='mt-10'>
    <TransformationForm
    action='Add'
    userId={user.id}
    type={transformation.type as TransformationTypeKey}
    creditBalance={user?.creditBalance}
    
    />



  </section>
  
  </>
  )
}

export default AddTSTypePage