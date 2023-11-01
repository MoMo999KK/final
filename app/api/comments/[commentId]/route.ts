import { findCurrenTeacher } from "@/app/actions/findCurrenTeacher"
import { getCurrentUser } from "@/app/actions/get-current-user"
import { db } from "@/lib/prismaDB"
import { tree } from "next/dist/build/templates/app-page"
import { NextResponse } from "next/server"

export async function DELETE(req:Request,{ params }: { params: { commentId: string }}){
 
  const user=await getCurrentUser()
    try {
        const updatedCourse=await db.comments.delete({
            where:{
                id:params.commentId,
                userId:user?.id
               
               

                


            },
           
        })
        return NextResponse.json("deleted succescully",{status:200})
        
    } catch (error) {
        return NextResponse.json("failed to update a course",{status:501})

        
    }
}
export async function POST(req:Request,{ params }: { params: { commentId: string }}){
    const {text}=await req.json()
    const currentUser=await getCurrentUser()
    if(!currentUser){
        return NextResponse.json("you can comment",{status:403})
    }
    if(!params.commentId){
        return NextResponse.json("invalid comentId",{status:400})
    }

    
       
        

    
    try {
        const replied=await db.comments.update({
            where:{
                id:params.commentId

            },
            data:{
                reply:{
                    create:{userId:currentUser?.id,text}
                }
            }

        })
        return NextResponse.json(replied,{status:201})

        
    } catch (error) {
        return NextResponse.json("failed to leave a commetn",{status:501})

        
    }
}

 
