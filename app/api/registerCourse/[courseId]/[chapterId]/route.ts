import { findCurrenTeacher } from "@/app/actions/findCurrenTeacher"
import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{ params }: { params: { chapterId: string }}){
    const values=await req.json()
 
    const teacher=await findCurrenTeacher()
    if(!teacher){
        return NextResponse.json("unthorized",{status:401})
    }
    try {
        const edittedCourse=await db.userCoursePart.update({
            where:{
                id:params.chapterId,


            },
            data:{
                ...values
            }
        })
        return NextResponse.json(edittedCourse,{status:200})

    } catch (error) {
        return NextResponse.json("failed to edit a couse server error",{status:501})

        
    }
}
export async function DELETE(req:Request,{ params }: { params: { chapterId: string }}){
    
 
     const teacher=await findCurrenTeacher()
    if(!teacher){
        return NextResponse.json("unthorized",{status:401})
    }
    try {
        const deleted=await db.userCoursePart.delete({
            where:{
                id:params.chapterId
            },
       
        })
        return NextResponse.json("deleted",{status:200})

    } catch (error) {
        return NextResponse.json("failed to delete a couse server error",{status:501})

        
    }
}