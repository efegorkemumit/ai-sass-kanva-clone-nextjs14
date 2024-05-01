import { Button } from '@/components/ui/button';
import { dataUrl, debounce, download, getImageSize } from '@/lib/utils';
import { TransformedImageProps } from '@/types'
import { Image, LoaderIcon } from 'lucide-react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import React from 'react'



const TransformedImage = ({image,isTransforming,title,
    transformationConfig, type,hasDownload,setIsTransforming
}:TransformedImageProps) => {

  
  return (
    <div className='flex flex-col gap-4'>
        <h3 className='font-semibold'>Transformed</h3>

     

       {image?.publicId && transformationConfig? (
       <>
       <div className='relative'>

        <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            placeholder={dataUrl as PlaceholderValue}
            src={image?.publicId}
            alt={image.title}
            onLoad={()=>{
                setIsTransforming && setIsTransforming(false)
            }}
            onError={()=>{
                debounce(()=>{
                    setIsTransforming && setIsTransforming(false)
                },9000)()
            }}

            {...transformationConfig}

           
        
        
        />

            {isTransforming &&(
                <div className=''>
                    <LoaderIcon width={50} height={50}/>
                    <p>Please Wait</p>

                </div>
           )}

       </div>
       

       </>
    
    ):(
    <>

    <div className='font-normal'>
        Transformed Image
    </div>
    
    </>
    
    
    
    )}



    </div>
  )
}

export default TransformedImage