'use client'

import { TransformationFormProps, Transformations } from '@/types'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from '@/constans'
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
import CustomField from './CustomFieald'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils'
import MediaUpload from './MediaUpload'
import TransformedImage from './TransformedImage'


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

        const [image, setImage] = useState(data);
        const transformationType = transformationTypes[type];

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

            setTransformationConfig(
              deepMergeObjects(newTransformation, transformationConfig)
            )

            setNewTransformation(null)

        }

        const onSelectFieldHandler = (value:string, onChangeField:(value:string)=>void)=>{

          const imageSize = aspectRatioOptions[value as AspectRatioKey];
  
          setImage((prevState: any) => ({
              ...prevState,
              aspectRatio: imageSize.aspectRatio,
              width: imageSize.width,
              height: imageSize.height,
          }));
          
          setNewTransformation(transformationType.config);

          return onChangeField(value)


        }

        const onInputChangeHanler =(fieldName: string, value:string, type:string, onChangeField:(value:string)=>void)=>{
            debounce(()=>{
              setNewTransformation((prevState:any)=>({
                ...prevState,
                [type]:{
                  ...prevState?.[type],
                  [fieldName==="prompt" ? 'prompt': 'to']:value
                }
              }))
            },2000)();

            return onChangeField(value)
        }

        useEffect(()=>{
          if(image &&(type==="restore" || type ==="zoompan")){
            setNewTransformation(transformationType.config)
          }
        },[image, transformationType.config, type])
    


  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        {creditBalance< Math.abs(creditFee) && <NoCreditModal/>}

        <CustomField
        control={form.control}
        name="title"
         formLabel='Image Title'
          className='w-full'
          render={({field})=><Input {...field} className='w-full' />}
        />

        {type=== 'fill' &&(

        <CustomField
        control={form.control}
        name="aspectRatio"
        formLabel='Aspect Ratio'
        className='w-full'
        render={({field})=>(
            <Select
            onValueChange={(value)=>onSelectFieldHandler(value, field.onChange)}
            value={field.value}
            >
            <SelectTrigger>
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
            {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem key={key} value={key} className="select-item">
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>

        )}
        />


        )}

        {(type === 'remove' || type==='recolor') &&(

            <CustomField
            control={form.control}
            name="prompt"
            formLabel={
                type==='remove' ? 'object to remove' : ' object to recolor'
            }
            className='w-full'
            render={({field})=>(
                <Input
                value={field.value}
                className=''
                onChange={(e)=>onInputChangeHanler('prompt', e.target.value,
                  type, field.onChange
                )}
                
                />
            )}
            />

        )}

        {type==="recolor" &&(
                <CustomField
                control={form.control}
                name="color"
                formLabel="Replace Color"
                className='w-full'
                render={({field})=>(
                    <Input
                    value={field.value}
                    className=''
                    onChange={(e)=>onInputChangeHanler('color', e.target.value,
                    'recolor', field.onChange
                  )}
                    
                    />
                )}
                />


             )}

<div className='grid h-fit grid-cols-1 md:grid-cols-2 gap-4 py-2 px-2 min-h-48'>
              <CustomField
                control={form.control}
                name="publicId"
                className='flex flex-col'
                render={({field})=>(
                  <MediaUpload
                  image={image}
                  publicId={field.value}
                  onValueChange={field.onChange}
                  type={type}
                  setImage={setImage}
                  
                  />
                    

                )}
                />

                <TransformedImage
                image={image}
                isTransforming={isTransforming}
                title={form.getValues().title}
                transformationConfig={transformationConfig}
                type={type}
                setIsTransforming={setIsTransforming}
                />

</div>


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