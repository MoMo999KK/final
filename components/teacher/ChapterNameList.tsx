"use client"

import { UserCourse, UserCoursePart } from "@prisma/client"
import axios from "axios"
import { Edit, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props{
  initialData:UserCoursePart[] | null | undefined
 
  userId:string | undefined
}
 
export const ChapterNameList = ({initialData,userId}:Props) => {
  const[loading,setLoading]=useState(false)
  console.log(initialData)

  const router=useRouter()
 




  
  return (
    <div>
      {initialData?.map((chapter:UserCoursePart)=>(
        <div className="flex flex-col" key={chapter.id}>
          <p>{chapter.name} <Edit onClick={()=>router.push(`/instructor/${userId}/create/chapters/${chapter.id}`)}/></p>

          


          {/*is editting is true and we actully show a from with name on it*/}

       <video src=""></video>
        </div>
      ))}
    </div>
  )
}

 