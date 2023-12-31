import { findCurrenTeacher } from "@/app/actions/findCurrenTeacher"
import { db } from "@/lib/prismaDB"
import { tree } from "next/dist/build/templates/app-page"
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

// filling the required values here by id in many to many relations
//using the params to take adventage of that becuse sending id by form .... 
//course id is alredy here
export async function POST(req:Request,{ params }: { params: { courseId: string }}){
    const values=await req.json()

    const teacher=await findCurrenTeacher()
    if(!teacher){
        return NextResponse.json("you arent allowed to creat/modifiy others courses",{status:403})
    }
    try {
        const updatedCourse=await db.userCourse.update({
            where:{
                id:params.courseId,
                userId:teacher?.id
               

                


            },
           data:{
            userCoursePart:{
                create:{...values}
            }
           },
           include:{
            userCoursePart:true,
            user:true
            
           }
        })
        return NextResponse.json(updatedCourse,{status:200})
        
    } catch (error) {
        return NextResponse.json("failed to update a course",{status:501})

        
    }
}
export async function DELETE(req:Request,{ params }: { params: { courseId: string }}){
    const {id}=await req.json()

    const teacher=await findCurrenTeacher()
    if(!teacher){
        return NextResponse.json("you arent allowed to creat/modifiy others courses",{status:403})
    }
    try {
        const updatedCourse=await db.userCourse.update({
            where:{
                id:params.courseId,
                userId:teacher?.id
               

                


            },
           data:{
            userCoursePart:{
                delete:{
                    id:id
                }
            }
           },
          
        })
        return NextResponse.json("deleted",{status:200})
        
    } catch (error) {
        return NextResponse.json("failed to update a course",{status:501})

        
    }
}
