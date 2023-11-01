import { getCurrentUser } from "@/app/actions/get-current-user"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    const reqBody=await req.json()
    const {id,values}=reqBody
    const user=await getCurrentUser()
   
    const canComment=user?.boughtCourses.includes(id)
     

    if(!canComment || user?.canComment===false){
        return NextResponse.json("You can comment cound be blocked or not boughted this course",{status:403})
    }

    try {
        const findCourse=await db.userCourse.findUnique({
            where:{
                id
            },
            include:{
                comments:true,
                
            },

           
           

        })
        if(!findCourse){
            return NextResponse.json("not course founded with that id to comment",{status:404})

        }
        const commented=await db.comments.create({
            
             
            data:{
                ...values,userCourseId:findCourse.id,userId:user?.id
            }
        })
        return NextResponse.json("comment added",{status:201})

        
    } catch (error) {
        
    }
}