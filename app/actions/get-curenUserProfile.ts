import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { db } from "@/lib/prismaDB"

export const getCurrentUserProfile=async(userId:string)=>{
    const session=await getServerSession(authOptions)
    
   
    const user=await db.user.findFirst({
        where:{
email:session?.user?.email as string
      },
      include:{
        comments:true
    
      }
 



 
    })
    return user
        


}