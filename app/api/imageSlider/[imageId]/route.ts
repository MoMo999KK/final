import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{ params }: { params: { courseId: string }}){
    const reqBody=await req.json()
    const{imageUrl}=reqBody
    const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("unathorized",{status:401})
    }

    try {
        const updatedSlider=await db.imageSlider.update({
            where:{
                id:params.courseId
            },
            data:{
               imageUrl
            }
            
        })
        return NextResponse.json(updatedSlider,{status:201})
        
    } catch (error) {
        return NextResponse.json("faailed to update a  sliderimage",{status:501})

        
    }
}