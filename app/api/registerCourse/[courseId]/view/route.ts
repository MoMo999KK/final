import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin";
import { db } from "@/lib/prismaDB";
import { NextResponse } from "next/server";

 
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
 

   
    const course = await db.userCourse.findUnique({
      where: {
        id: params.courseId,
        
      },
    
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

 
    
    const paidCourse = await db.userCourse.update({
      where: {
        id: params.courseId,
       },
      data: {
        view:{
            increment:1
        },
      }
    });

    return NextResponse.json(paidCourse,{status:200});
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}