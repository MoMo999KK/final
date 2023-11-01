
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function POST(req:Request){
  
    try {
        const body=await req.json()
        const{title}=body
      const courses=await db.doreh.create({
        data:{
            title,
            imageUrl:"www",
            userId:"1",
            categoryId:"1",
            introVideo:"uuii"

        }
      })
      return NextResponse.json(courses,{status:201})
        
    } catch (error) {
        return NextResponse.json("failed to create a course",{status:501})

    }
}