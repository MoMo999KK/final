


import { db } from "@/lib/prismaDB"

export const getSingleChapter=async(chapterId:string)=>{
    const course=await db.userCoursePart.findUnique({
        where:{
            id:chapterId
        },
     
    })
    return course
}


 