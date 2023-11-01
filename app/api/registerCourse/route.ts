import { db } from "@/lib/prismaDB";
 
 import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { findCurrenTeacher } from "@/app/actions/findCurrenTeacher";
 

export async function POST(
  request: Request
) {

  const body = await request.json();
  const {
    name,
    price
    
   
  } = body;
  const creator=await findCurrenTeacher()
if(!creator){
  return NextResponse.json("u rent allowed",{status:403})
}


  const usersCourse = await db.userCourse.create({
    //@ts-ignore
    data: {
    
      name,
      price,
      userId:creator.id
     
      
     
    }
  });

  return NextResponse.json(usersCourse);
}