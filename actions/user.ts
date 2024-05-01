'use server'

import { prismadb } from "@/lib/db"


export const getByUserId = async(id:string)=>{

    const user = await prismadb.user.findUnique({
        where:{
            clerkId:id
        }
    })

    return user
}

export async function updateCredits(userId:type, creditFee:number) {

    const updateUserCredits = await prismadb.user.update({
        where:{
            id:userId,
        },
        data:{
            creditBalance:{
                increment:creditFee
            }
        }
    })

    return updateUserCredits;
    
}