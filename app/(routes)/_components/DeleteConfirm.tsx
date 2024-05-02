'use client'

import React, { useTransition } from 'react'
import { string } from 'zod'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { deleteImage } from '@/actions/image'
import { redirect } from 'next/navigation'

interface DeleteConfirmProps{
    imageId:string;
}
const DeleteConfirm = ({imageId}:DeleteConfirmProps) => {

    const [isPending, startTransition] = useTransition();
 
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">
        Delete Image

      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={()=>startTransition(async()=>{
            await deleteImage(imageId);
            redirect("/")
        })}>
            {isPending ? "Deleting....": "Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteConfirm