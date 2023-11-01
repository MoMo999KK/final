import { findCurrenTeacher } from "@/app/actions/findCurrenTeacher"
import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{ params }: { params: { messageId: string }}){
    const values=await req.json()
 
    const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("unthorized",{status:401})
    }
    try {
        const edittedSlider=await db.messageNotification.update({
            where:{
                id:params.messageId,


            },
            data:{
              ...values
            }
        })
        return NextResponse.json(edittedSlider,{status:200})

    } catch (error) {
        return NextResponse.json("failed to edit a slider, server error",{status:501})

        
    }
}
export async function DELETE(req:Request,{ params }: { params: { messageId: string }}){
    
  
    const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("unthorized",{status:401})
    }
    try {
        const deletedMessage=await db.messageNotification.delete({
            where:{
                id:params.messageId
            },
       
        })
        return NextResponse.json("this message is deleted now",{status:200})

    } catch (error) {
        return NextResponse.json("failed to delete a couse server error",{status:501})

        
    }
}