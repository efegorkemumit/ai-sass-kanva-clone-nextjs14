import { getByImageId } from '@/actions/image';
import { getByUserId } from '@/actions/user';
import HeaderLabel from '@/app/(routes)/_components/HeaderLabel';
import TransformationForm from '@/app/(routes)/_components/TransformationForm';
import { transformationTypes } from '@/constans';
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const TransformationUpdatePage = async({params:{id}} :SearchParamProps) => {
  const {userId} = auth();
  if (!userId) redirect("/sign-in");

  const user = await getByUserId(userId);
  const image = await getByImageId(id);
  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];


  return (
    <>
      <HeaderLabel title={transformation.title} subtitle={transformation.subtitle}/>

      <section className='mt-10'>
      <TransformationForm
        action="Update"
        userId={user.id}
        type={image.transformationType as TransformationTypeKey}
        creditBalance={user.creditBalance}
        config={image.config}
        data={image}
      />


      </section>
    
    </>
  )
}

export default TransformationUpdatePage