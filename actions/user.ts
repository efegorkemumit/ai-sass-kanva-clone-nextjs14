import { prismadb } from "@/lib/db"


export const getByUserId = async(id:string)=>{

    const user = await prismadb.user.findUnique({
        where:{
            clerkId:id
        }
    })

    return user
}