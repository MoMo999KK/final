import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { db } from "@/lib/prismaDB"
import { findCurrenAdmin } from "./findCurrentAdmin"

export const getImagesSider=async()=>{
    const session=await getServerSession(authOptions)
    const admin=await findCurrenAdmin()
    if(!session || !admin){
        return null
    }
    const images=await db.imageSlider.findMany({
        orderBy:{
            createdAt:"asc"
        }
       
    })
    return images

}