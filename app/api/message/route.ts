import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    const body=await req.json()
    const admin=await findCurrenAdmin()
    if(!admin ) return NextResponse.json("only admin can modify the sliders messages!")
    try{
        const messages=await db.messageNotification.create({
            data:{
                ...body
            }
        })
        return NextResponse.json(messages,{status:201})

    }catch{
        return NextResponse.json("failed to create notification message",{status:501})


    }
}