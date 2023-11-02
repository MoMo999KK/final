"use client"

import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import useRegisterModal from "@/app/stores/useRegisterModal"
import { useRouter } from "next/navigation"
import { UserCourse } from "@prisma/client"
import axios from "axios"
interface Props{
    initialData:UserCourse | null

  }

export const HandelLogin = ({initialData}:Props) => {
  const {data:session}=useSession()
  const registerModal=useRegisterModal()
  const router=useRouter()
  const courseId=initialData?.id

 


  const handelLoginCheck= async()=>{
    if(!session){
      registerModal.onOpen()
    }
    if(session && initialData?.isFree){
        const response=await axios.post(`/api/free/${courseId}`)
        router.refresh()




    }



  }
  return (
    <div>
       
      {initialData?.isFree===true  &&(
    <div className="">
        <Button onClick={()=>handelLoginCheck()}>join its free</Button>

    </div> 
    )}
    {session && initialData?.isFree===false && (
    <div className="">  <Button onClick={()=>router.push("/buy")}>{initialData?.price}</Button></div>  )}
      
       
  
       

    </div>
  )
}

 