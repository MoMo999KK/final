import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

 
export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  
    const session=await getServerSession(authOptions)
  
  try {
    const checkFree=await db.userCourse.findUnique({
      where:{
        id:params.courseId,
        isFree:true
      }
    })
    if(!checkFree){
      return NextResponse.json("either the course isnt free or not founded",{status:400})
    }
  
 



 
 
    
   
    const addedCourse = await db.user.update({
      where: {
        email:session?.user?.email!,
        
      },
      data:{
        boughtCourses:{
           push:params.courseId
        }
       }
      
    
    });
    const  result = parseInt("0")
    const purchuse=await db.purchuses.create({
     data:{
    userId:addedCourse.id,
    userCourseId:params.courseId,
    isFree:true,
    price:result.toExponential()

     }
    })

  if(!addedCourse || purchuse){
    return NextResponse.json("failed to add the course  ",{status:400})

  }

  

    return NextResponse.json({addedCourse,purchuse},{status:200});
  } catch (error) {
    
    return new NextResponse("Internal Error", { status: 500 });
  } 
}