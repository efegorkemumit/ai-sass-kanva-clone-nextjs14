import React from 'react'
import { Control } from 'react-hook-form'
import { formSchema } from './TransformationForm'
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

interface CustomFiealdProps{
    control: Control<z.infer<typeof formSchema>> | undefined;
    render: (props: {field:any})=>React.ReactNode;
    name: keyof z.infer<typeof formSchema>;
    formLabel?: string;
    className?:string;
}


const CustomField = ({control,name,render,className,formLabel}:CustomFiealdProps) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={className}>
        {formLabel && <FormLabel>{formLabel}</FormLabel>}
        <FormControl>
        {render({field})}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default CustomField