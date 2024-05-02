import { getByImageId } from '@/actions/image'
import { getByUserId } from '@/actions/user'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import HeaderLabel from '../../_components/HeaderLabel'
import { getImageSize } from '@/lib/utils'
import Image from 'next/image'
import TransformedImage from '../../_components/TransformedImage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DeleteConfirm from '../../_components/DeleteConfirm'

interface TransformationPageDetailProps{
  params:{
    id:string
  }
}
const TransformationPageDetail = async({params}:TransformationPageDetailProps) => {

  const {userId} = auth();
  const user = await getByUserId(userId)
  const image = await getByImageId(params.id)

  return (
   <>
   <HeaderLabel title={image?.title}/>

   <section className='mt-5 flex flex-wrap gap-3'>

        <div className='text-xl font-medium flex gap-2'>
          <p className='text-purple-700'>Transformation :</p>
          <p className='capitalize'>{image?.transformationType}</p>

        </div>

        {image?.prompt &&(
          <div className='text-xl font-medium flex gap-2'>
          <p className='text-purple-700'>Prompt :</p>
          <p className='capitalize'>{image?.prompt}</p>

        </div>
        )}

        {image?.color &&(
          <div className='text-xl font-medium flex gap-2'>
          <p className='text-purple-700'>Color :</p>
          <p className='capitalize'>{image?.color}</p>

        </div>
        )}

      {image?.aspectRatio &&(
          <div className='text-xl font-medium flex gap-2'>
          <p className='text-purple-700'>AspectRatio :</p>
          <p className='capitalize'>{image?.aspectRatio}</p>

        </div>
        )}


    
   </section>

   <section className='mt-8 flex flex-wrap gap-3'>
    <div className="grid h-fit grid-cols-1 md:grid-cols-2 gap-4 py-2 px-2 min-h-48">
      <div className='flex flex-col gap-5'>
        <h3 className='font-semibold'>Orginal</h3>

          <Image
                width={getImageSize(image.transformationType, image, "width")}
                height={getImageSize(image.transformationType, image, "height")}
                src={image.secureURL}
                alt="image"
              />
      </div>
<TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />

          {user.id === image?.authorId &&(
            <div className='mt-4'>
              <Button asChild type='button'>
                <Link href={`/transformations/${image.id}/update`}>
                update Image
                
                </Link>

              </Button>

              <DeleteConfirm imageId={image.id}/>
             
             
              </div>
          )}



      
    </div>


   </section>
   
   
   
   </>
  )
}

export default TransformationPageDetail