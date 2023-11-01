import { db } from "@/lib/prismaDB"
import { stat } from "fs"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req:Request,{ params }: { params: { tokenId: string }}){
    const reqBody=await req.json()
    const{hashedPassword}=reqBody
      try {
        const  validTokended=await db.forgetPasswordToken.findUnique({
            where:{
                code:params.tokenId,
                createdAt:{gt:new Date(Date.now()-1000*60*60*4)}
            
            
             },
             include:{
                user:true
             }
             
        })


        if(!validTokended){
            return NextResponse.json("expird token",{status:400})
        }
        const newHashedPassword=await bcrypt.hash(hashedPassword,8)
        const updatedUserPassword=await db.user.update({
            where:{
                id:validTokended.user.id
            },
            data:{
                hashedPassword:newHashedPassword

            }

        })
        return NextResponse.json(updatedUserPassword,{status:200})
        


      
        // send email and the response that inform the user that the email exist and we can validate that
        //toas th user that the email has been sent and thats valid for a  certaine aboumt of time

        
    } catch (error) {
        return NextResponse.json("server error",{status:501})

        
    }
}