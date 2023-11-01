import { db } from "@/lib/prismaDB";
import bcrypt from "bcrypt";
 
 import { NextResponse } from "next/server";
 

export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    email,
    name,
    password
  } = body;
  try {
    
 


  const hashedPassword = await bcrypt.hash(password, 12);
  if(!email || !hashedPassword || !name){
    return NextResponse.json("please fill all requred field",{status:400})
  }
  const existedUseralredy=db.user.findUnique({
    where:{
      email
    }
  })
 
 




  const user = await db.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  });


  return NextResponse.json(user,{status:201});
} catch (error) {
  return NextResponse.json("failed to register a user server error", {status:501});

    
}
}