import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { db } from "@/lib/prismaDB"

export const getCurrentUser=async()=>{
    const session=await getServerSession(authOptions)
    if(!session ){

        return null
    } 
    const user=await db.user.findUnique({
        where:{
email:session.user?.email!,
canComment:true       },
select:{
    boughtCourses:true,
    id:true,
    canComment:true,
    
}



 
    })
    return user
        


}