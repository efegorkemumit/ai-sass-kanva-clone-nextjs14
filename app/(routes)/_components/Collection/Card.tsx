import { Image } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import React from 'react'

interface CardProps{
    image:Image
}

const Card = ({image}:CardProps) => {
  return (
    <li>
        <Link href={`/transformations/${image.id}`}
         className='flex flex-1 flex-col cursor-pointer gap-5 rounded-lg border2- p-4 m-2 shadow-xl '>

        <CldImage
        src={image.publicId}
        alt={image.title}
        width={image.width}
        height={image.height}
        {...image.config}
        loading="lazy"
        className="h-52 w-full object-cover "
      />
      <div className='flex justify-between items-center'>
        <p className='font-semibold'>
            {image.title}
        </p>


      </div>


        
        </Link>

    </li>
  )
}

export default Card