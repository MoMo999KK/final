import { db } from "@/lib/prismaDB";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { intentId: string } }
  ){
    const {intentId}=params
    try {
    await db.purchuses.update({
        //@ts-ignore
       where:{
        intent_id:params.intentId

       },
       data:{
        status:"paid"

       }
        })
        
        return NextResponse.json("paid and updated succesfuly")

        


    } catch (error) {
        
    }





  }