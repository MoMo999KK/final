import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin";
import { db } from "@/lib/prismaDB";
import { NextResponse } from "next/server";

 
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("xou arent allowed to modify the courses",{status:403})
    }

   
    const findedUser = await db.user.findUnique({
      where: {
        id: params.userId,
        
      },
    
    });

    if (!findedUser) {
      return new NextResponse("Not found", { status: 404 });
    }

 
    
    const edittedUser = await db.user.update({
      where: {
        id: params.userId,
       },
      data: {
       isInstructor : true,
      }
    });

    return NextResponse.json(edittedUser,{status:200});
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}