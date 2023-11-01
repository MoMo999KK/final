import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { db } from "@/lib/prismaDB"

export const getCategories=async()=>{
 
    const categories=await db.category.findMany({
       
      
    })
    return categories

}