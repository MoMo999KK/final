import { findCurrenTeacher } from "@/app/actions/findCurrenTeacher"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{ params }: { params: { courseId: string }}){
    const values=await req.json()
    const teacher=await findCurrenTeacher()
    try {
        const updatedCourse=await db.userCourse.update({
            where:{
                id:params.courseId,
                userId:teacher?.id
               

                


            },
            data:{
                ...values

            }
        })
        return NextResponse.json(updatedCourse,{status:200})
        
    } catch (error) {
        return NextResponse.json("failed to update a course",{status:501})

        
    }
}
  
export async function GET(req:Request,{ params }: { params: { courseId: string }}){
    const values=await req.json()
    const teacher=await findCurrenTeacher()
    try {
        const updatedCourse=await db.userCourse.findFirst({
            where:{
                id:params.courseId,
                userId:teacher?.id
               

                


            },
            include:{
                category:true,
                userCoursePart:true,
                
            }
          
        })
        return NextResponse.json(updatedCourse,{status:200})
        
    } catch (error) {
        return NextResponse.json("failed to update a course",{status:501})

        
    }
}