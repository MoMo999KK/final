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
        const newCategory=await db.category.create({
            data:{
                ...values
            }

        })
        return NextResponse.json(newCategory,{status:201})
    } catch (error) {
        return NextResponse.json("failed to create a category",{status:501})

        
    }
}