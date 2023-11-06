{/*

"use client"

import useChattContainer from "@/app/stores/use-chattModal"
import ChattBox from "@/components/chatt/user/chatt-box"
import { Room } from "@prisma/client"
import { useCallback, useState } from "react"
 

export const ChattComponet=()=>{
    const chattContainer=useChattContainer()
    
 

    
    
    return(
        <>
        {chattContainer.isOpen ? (
            <div className="fixed bottom-0 right-0">
               <ChattBox  />
                
            </div>
       
        ) :( <div className=" fixed bottom-0 h-[50px] w-[250px] shadow-lg bg-red-200 right-0 rounded-md" onClick={()=>chattContainer.onOpen()}>
       <p className="text-center">  Chatt With Admin</p>
        </div> ) }
        </>
    )
}
*/}