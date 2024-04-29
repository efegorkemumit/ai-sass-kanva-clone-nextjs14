'use client'

import { TransformationFormProps, Transformations } from '@/types'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { creditFee, defaultValues } from '@/constans'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import NoCreditModal from './NoCreditModal'



export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
  })


const TransformationForm = ({action,creditBalance,type,userId, 
    config,data}:TransformationFormProps) => {

        const router = useRouter();
        const [isPending, startTransition] = useTransition()
        const [isTransforming, setIsTransforming] = useState(false);

        const [transformationConfig, setTransformationConfig] = useState(config)
        const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
        const [isSubmitting, setIsSubmitting] = useState(false);


        const initialValues = data && action === 'Update' ? {
            title: data?.title,
            aspectRatio: data?.aspectRatio,
            color: data?.color,
            prompt: data?.prompt,
            publicId: data?.publicId,
          } : defaultValues

          const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: initialValues,
          })


        async function onSubmit(values:z.infer<typeof formSchema>) {
            setIsSubmitting(true);

            setIsSubmitting(false);
            
        }

        const onTransformHandler = async()=>{

            setIsTransforming(true)

            setNewTransformation(null)

        }
    


  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        {creditBalance< Math.abs(creditFee) && <NoCreditModal/>}

        <div className='flex flex-col gap-3'>
            <Button type='button'
            className=''
            disabled={isTransforming ||newTransformation === null}
            onClick={onTransformHandler}
            >
                {isTransforming ? 'Transforming...' : 'Apply Transforming'}

            </Button>

            <Button type='submit'
            className=''
            disabled={isSubmitting}
            >
                {isSubmitting ? 'Submiting...' : 'Save Image'}

            </Button>



        </div>



    </form>



  </Form>
  )
}

export default TransformationForm