import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function PATCH(req:Request,{ params }: { params: { userId: string }}){
    const reqBody=await req.json()
    const {hashedPassword}=reqBody
     const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("unathorized",{status:401})
    }

    try {
        const userWithpassword=await db.user.findUnique({
            where:{
                id:params.userId
            }
        })
          
        const cleanedPassword=await db.user.update({
            where:{
                id:params.userId
            },
            data:{
              hashedPassword:null
            }
            
        })
        const newHashedPassword=await bcrypt.hash(hashedPassword,9)
        const newPassword=await db.user.update( {
            where:{
                id:params.userId
            },
            data:{
                hashedPassword:newHashedPassword
            }


        })




        return NextResponse.json(newPassword,{status:201})
        
    } catch (error) {
        return NextResponse.json("faailed to update password of a user",{status:501})

        
    }
}

export async function PUT(req:Request,{ params }: { params: { userId: string }}){
    const reqBody=await req.json()
    const {id}=reqBody
     const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("unathorized",{status:401})
    }
    const finCourse=await db.userCourse.findUnique({
        where:{
            id
        }
    })
    if(!finCourse){
        return NextResponse.json("not any course with that id exist",{status:404})
    }
    const checkuser=await db.user.findUnique({
        where:{
            id:params.userId,
            boughtCourses:{
                has:id
            }
        }
    })
    if(checkuser){
        return NextResponse.json("you alredy have openend this course for him",{status:401})
    }

    try {
        const user=await db.user.findUnique({
            where:{
                id:params.userId
            }
        })
        if(!user || !params.userId){
            return NextResponse.json("user not founded!",{status:404})
        }
        const course=await db.userCourse.findFirst({
            where:{
                id,
                isFree:true
            },
        })
        if(!course) {
            return NextResponse.json("course isnot free not founded!",{status:409})

        }
          
        const updatedUser=await db.user.update({
            where:{
                id:params.userId,
                
            },
            data:{
             boughtCourses:{
                push:id
             }
            }
            
        })
         const puchuse=await db.purchuses.create({
            data:{
                userId:params.userId,
                userCourseId:course.id,
                price:10,
                isFree:true

            }

        })
       
   




        return NextResponse.json(updatedUser,{status:201})
        
    } catch (error) {
        return NextResponse.json("faailed to update password of a user",{status:501})

        
    }
}