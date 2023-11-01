import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    const values=await req.json()
    const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("You arenot allowed to create any category",{status:403})
    }

    try {
        const messages=await db.messageNotification.create({
            data:{
                ...values
            }

        })
        return NextResponse.json(messages,{status:201})
    } catch (error) {
        return NextResponse.json("failed to create a category",{status:501})

        
    }
}

export async function GET(req:Request){
     
 
    try {
        const messages=await db.messageNotification.findMany({
            orderBy:{
                createdAt:"asc"
            }
            

        })
        return NextResponse.json(messages,{status:200})
    } catch (error) {
        return NextResponse.json("failed to create a category",{status:501})

        
    }
}