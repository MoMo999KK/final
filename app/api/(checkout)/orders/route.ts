// createing an orderId and then as resüpnse we give the id of that order
//as the fir status of the order we add status not paid

import { getCurrentUser } from "@/app/actions/get-current-user";
import { db } from "@/lib/prismaDB";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";



export async function POST(req:Request){
    const reqBody=await req.json()
    const {email,price,courseId,teacherId}=reqBody
    try {
        const currentUser=await getCurrentUser()
        const newPurchuse=await db.purchuses.create({
            data:{
                email,
                price,
                userCourseId:courseId,
                teacherId:teacherId,

            }
           

        })
        return NextResponse.json(newPurchuse.id,{status:201})

        
    } catch (error) {
        return NextResponse.json("failed to create a  course",{status:501})

        
    }
}