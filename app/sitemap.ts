import { db } from "@/lib/prismaDB";

export default async function sitemap(){
    const courses=await db.userCourse.findMany({
        where:{
            isPublished:true
        }
    })
    const ss=courses.map((course)=>(
        
    ))



}