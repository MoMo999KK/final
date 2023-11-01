import { db } from "@/lib/prismaDB"

export const getSingleCourse=async(courseId:string)=>{
    const course=await db.userCourse.findUnique({
        where:{
            id:courseId
        },
        include:{
            user:{
                select:{
                    name:true,
                    isInstructor:true,
                    id:true
                }
            },
            category:
                true,
                userCoursePart:true
            
        
        }
    })
    return course
}