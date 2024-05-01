"use server"

import { prismadb } from "@/lib/db"
import { AddImageParams } from "@/types"


export const AddImage = async({imageData, userId}:AddImageParams)=>{

    const user = await prismadb.user.findUnique({
        where:{
            id:userId
        }
    })

    if(!userId){
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