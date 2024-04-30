import { Button } from '@/components/ui/button';
import { debounce, download, getImageSize } from '@/lib/utils';
import { TransformedImageProps } from '@/types'
import { Image, LoaderIcon } from 'lucide-react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import React from 'react'



const TransformedImage = ({image,isTransforming,title,
    transformationConfig, type,hasDownload,setIsTransforming
}:TransformedImageProps) => {

    const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();

        download(getCldImageUrl({
            width:image?.width,
            height:image?.height,
            src: image?.publicId,
            ...transformations
        }), title)

    }
  return (
    <div className='flex flex-col gap-4'>
        <h3 className='font-semibold'>Transformed</h3>

        {hasDownload && (
            <Button onClick={downloadHandler}>
                <Image className='text-5xl'/>

            </Button>

        )}

       {image?.publicId && transformationConfig? (
       <>
       <div className='relative'>

        <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
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