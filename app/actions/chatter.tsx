import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { db } from "@/lib/prismaDB"

export const findCurrentChatter=async()=>{
    const session=await getServerSession(authOptions)
    if(!session){
        return null
    }
    const chatter=await db.user.findUnique({
        where:{
            email:session?.user?.email as string,
           
        }
    })
    return chatter

}