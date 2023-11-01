 
 import { db } from "@/lib/prismaDB"

export const getUsers=async()=>{
 
    const users=await db.user.findMany({
        where:{
          
        },
        orderBy:{
            createdAt:"asc"
        }
       
      
    })
    return users

}