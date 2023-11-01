"use client"

import { MessageNotification } from "@prisma/client"
import { Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

 
interface MessagesPros{
  initialData:MessageNotification[] | null
}
 
const ManagSlider = ({initialData}:MessagesPros) => {
  const router=useRouter()
 

  return (
    <div className="w-full">
      {initialData?.map((message)=>(
        <div className="flex" key={message.id}>
          <p>{message.message1}</p>
           <Edit onClick={()=>router.push(`/adminstrator/slider/${message.id}`)} />

        </div>
      ))}
     
   
    </div>
  )
}

export default ManagSlider