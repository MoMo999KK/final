import { db } from "./lib/prismaDB"

export const getsingleCourse=async(courseId:string)=>{
    try {
        
    const singleCourse=  await  db.userCourse.findUnique({
            where:{
               id:courseId
           },
            include:{
                user:true,
                userCoursePart:true,
                comments:{
                 include:{
                   user:true,
                   reply:true
                 },
                
                }
     
            }
            }
        )
        return singleCourse
    } catch (error) {
        throw new Error("comething went wrong fetching the data")
        
    }
}