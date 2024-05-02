'use client'

import { updateUrlQuery } from '@/lib/utils';
import { Image } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Button } from '@/components/ui/button';
import Card from './Card';


interface CollectionProps{
    images: Image[];
    totalPages?:number;
    page:number
}

const Collection = ({ images,page,totalPages}:CollectionProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const onPageChange = (action:string)=>{
        const pageValue = action ==="next" ? Number(page) +1 : Number(page)-1

        const newUrl = updateUrlQuery("page", pageValue);

        router.push(newUrl,{scroll:false});
    }
  return (
    <>
    
    <div className='flex flex-col gap-4'>
        <h2 className='font-semibold text-2xl'>Recent Edits</h2>


    </div>
    {images.length>0 ? (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {images.map((image)=>(
                <Card key={image.id} image={image}/>
            ))}

      
         
         </ul>
    ):
    (
        <div className='flex items-center justify-center text-center border '>
            <p>Empyt List</p>
        </div>
    )
    }

    {totalPages>1 &&(

            <Pagination className='mt-10'>
            <PaginationContent className='flex w-full'>
                <Button disabled={Number(page)<=1}
                onClick={()=>onPageChange("prev")}>

                    <PaginationPrevious className='hover:bg-transparent hover:text-white'/>


                </Button>

                <p>
                    {page} /{totalPages}
                </p>

                <Button disabled={Number(page)>=totalPages}
                onClick={()=>onPageChange("next")}>

                    <PaginationNext className='hover:bg-transparent hover:text-white'/>


                </Button>
           
            </PaginationContent>
            </Pagination>



    )}

    </>
  )
}

export default Collection