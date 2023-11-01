import { db } from "@/lib/prismaDB";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try {
        const courses=await db.userCourse.findMany({
            where:{
                isFree:true,
                isPublished:true
            },
            include:{
                user:true,
                userCoursePart:true
            }
        })
        return NextResponse.json(courses,{status:200})
        
    } catch (error) {
        return NextResponse.json("failed to feach courses!server error",{status:501})

        
    }
}