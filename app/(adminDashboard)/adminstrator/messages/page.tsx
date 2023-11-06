 
{/*
import {  FullConversationType } from "@/app/types/types"
import { ChatMainComponent } from "@/components/chatt/admin/chatMainComponent"
import { ChattItem } from "@/components/chatt/admin/chatt-item"
import { db } from "@/lib/prismaDB"
import { Room } from "@prisma/client"
import Image from "next/image"

 

const Messages =async () => {

    const conversations=await db.room.findMany({
       
        orderBy:{
            createdAt:"asc"
        },
        
        include:{
            user:true,
            messageChatt:{
                
                
                include:{
                    user:true
                }
            }
        }
    })

    console.log(conversations,"rooms")
  return (
    
    
<>
<ChatMainComponent conversations={conversations}/>
</>
  
  )
}

export default Messages
*/}import React from 'react'

const MesagesPage = () => {
  return (
    <div className="mb-[700px]">MesagesPage</div>
  )
}

export default MesagesPage



