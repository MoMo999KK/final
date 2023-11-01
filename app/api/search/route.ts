import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function GET(req:Request) {
   
        const url=new URL(req.url)
        const q=url.searchParams.get("q")
        try {
            const result=await db.userCourse.findMany({
                where:{
                 OR:[
                    {
                        name:{
                            startsWith:q!
                        },

                    },
                    {
                        description:{
                            startsWith:q!
                        },

                    }

                 ],
                 isPublished:true
                }
            })
            return NextResponse.json(result,{status:200})
    } catch (error) {
        return NextResponse.json("faled to fetch the result server error",{status:501})

        
    }
    
}