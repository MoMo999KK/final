import { findCurrenAdmin } from "@/app/actions/findCurrentAdmin"
import { db } from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    const data=await req.json()
    const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("unathorized",{status:401})
    }

    try {
        const imageSlider=await db.imageSlider.create({
            data:{
                ...data
            }
            
        })
        return NextResponse.json(imageSlider,{status:201})
        
    } catch (error) {
        return NextResponse.json("faailed to create a  sliderimage",{status:501})

        
    }
}
export async function PATCH(req:Request){
    const reqBody=await req.json()
    const{initialData,imageUrl}=reqBody
    const admin=await findCurrenAdmin()
    if(!admin){
        return NextResponse.json("unathorized",{status:401})
    }

    try {
        const updatedSlider=await db.imageSlider.update({
            where:{
                id:"6535994353cbfdd06d8a589f"
            },
            data:{
               imageUrl
            }
            
        })
        return NextResponse.json(updatedSlider,{status:201})
        
    } catch (error) {
        return NextResponse.json("faailed to update a  sliderimage",{status:501})

        
    }
}