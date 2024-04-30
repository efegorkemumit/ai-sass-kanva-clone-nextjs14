'use client'

import React from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useToast } from '@/components/ui/use-toast';
import { FcAddImage } from 'react-icons/fc';
import { getImageSize } from '@/lib/utils';

type MediaUploadProps={
    onValueChange:(value:string)=>void;
    setImage:React.Dispatch<any>;
    publicId:string;
    image:any;
    type:string;
}

const MediaUpload = ({image,onValueChange,publicId,setImage,type}:MediaUploadProps) => {

    const {toast} = useToast();

    const onUploadSuccessHandler=(result:any)=>{

        setImage((prevstate:any)=>({
            ...prevstate,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url


        }))

        onValueChange(result?.info?.public_id)
        toast({
            title: 'Image uploaded successfully',
            description: '1 credit was deducted from your account',
            variant:"success",
            duration: 5000,
            className: 'success-toast' 
          })

        

    }
    const onUploadErrorHandler=()=>{
        toast({
            title: 'Something went wrong',
            variant:"destructive",
            duration: 5000,
            className: 'success-toast' 
          })
        
    }
  return (
    <CldUploadWidget
        uploadPreset='t2yzdbtx'
        options={{
            multiple:false,
            resourceType:"image"
        }}
        onSuccess={onUploadSuccessHandler}
        onError={onUploadErrorHandler}
     >
          {({ open }) => (
            <div className='flex flex-col gap-2'>
                <h3 className='font-semibold'>Orginal</h3>

                {publicId ? (
                        <>
                        <div className=''>
                        <CldImage
                            width={getImageSize(type,image,"width")}
                            height={getImageSize(type,image,"height")}
                            src={publicId}
                            alt='image'
                            
                        />


                        </div>

                        </>

                ):
                (

                    <div className='' onClick={()=>open()}>
                        <div>
                        <FcAddImage className="text-6xl" />

                        <p>Click here to upload</p>

                        </div>
                    </div>


                )}

            </div>

          )}
    
    
    </CldUploadWidget>
  )
}

export default MediaUpload