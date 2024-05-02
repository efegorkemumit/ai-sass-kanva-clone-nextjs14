"use server"

import { prismadb } from "@/lib/db"
import { AddImageParams } from "@/types"


export const AddImage = async({imageData, userId}:AddImageParams)=>{

    const user = await prismadb.user.findUnique({
        where:{
            id:userId
        }
    })

    if(!user){
        throw new Error("User not found");
    }

    const newImage = await prismadb.image.create({
        data:{
            ...imageData,
            authorId:userId
                        
        }
    })

    return JSON.parse(JSON.stringify(newImage));



}

export const getByImageId = async(imageId:string)=>{

    const image = await prismadb.image.findUnique({
        where:{
            id:imageId
        }
    })

    return image
}

export const deleteImage = async(imageId:string)=>{
    const deleteImage = await prismadb.image.delete({
        where:{
            id:imageId
        }
    })

    return deleteImage;
}
