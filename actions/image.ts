"use server"

import { prismadb } from "@/lib/db"
import { AddImageParams, UpdateImageParams } from "@/types"


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

export const UpdateImage = async({imageData, userId,id}:UpdateImageParams)=>{

    const user = await prismadb.user.findUnique({
        where:{
            id:userId
        }
    })

    if(!user){
        throw new Error("User not found");
    }

    const newImage = await prismadb.image.update({
        where:{
            id:id
        },
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


export async function getAllImages({limit=8, page=1}:
    {
        limit?:number;
        page:number
    }) 
{
    try {
        const skipAmmount = (page-1)* limit;

        const images =  await prismadb.image.findMany({
            orderBy:{updatedAt:'desc'},
            skip:skipAmmount,
            take:limit,
            include:{author:true}

        })

        const totalImages = await prismadb.image.count();

        const totalPage = Math.ceil(totalImages/limit);

        return{data:images, totalPage, savedImages: totalImages}
        
    } catch (error) {

        console.error('Error fetching images:', error);
        throw new Error('Error fetching images');
  
        
    }
    
}

export async function getUserImages({limit=8, page=1, userId}:
    {
        limit?:number;
        page:number;
        userId:string
    }) 
{
    try {
        const skipAmmount = (page-1)* limit;

        const images =  await prismadb.image.findMany({
            where:{authorId:userId},
            orderBy:{updatedAt:'desc'},
            skip:skipAmmount,
            take:limit,
            include:{author:true}

        })

        const totalImages = await prismadb.image.count();

        const totalPage = Math.ceil(totalImages/limit);

        return{data:images, totalPage, savedImages: totalImages}
        
    } catch (error) {

        console.error('Error fetching images:', error);
        throw new Error('Error fetching images');
  
        
    }
    
}

