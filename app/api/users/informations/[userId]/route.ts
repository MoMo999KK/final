import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{ params }: { params: { userId: string }}){
   
    const values=await req.json()
     const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("unathorized",{status:401})
    }

    try {
        const user=await db.user.findUnique({
            where:{
                id:params.userId
            }
        })
        if(!user || !params.userId){
            return NextResponse.json("user not founded!",{status:404})
        }
          
        const updatedUser=await db.user.update({
            where:{
                id:params.userId
            },
            data:{
             ...values
            }
            
        })
       
   




        return NextResponse.json(updatedUser,{status:201})
        
    } catch (error) {
        return NextResponse.json("faailed to update password of a user",{status:501})

        
    }
}