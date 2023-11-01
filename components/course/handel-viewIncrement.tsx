"use client"

import axios from "axios"
import { useEffect, useState } from "react"
interface Props{
    courseId:string | undefined;

}

export const HandelViewIncrement = ({courseId}:Props) => {
    useEffect(()=>{
        const handelIncrement=async()=>{
            const response=await axios.patch(`/api/registerCourse/${courseId}/view`)

            

        }
        handelIncrement()

    },[courseId])
    return(
        <div className="hidden">hello</div>
        
        )
    }

 

 