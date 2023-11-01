"use client"

import { UserCourse } from "@prisma/client"
import axios from "axios"
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface Props{
    isPublished:boolean | undefined
    courseId:string | undefined
}
export const CoursePublishForm = ({isPublished,courseId}:Props) => {
    const {toast}=useToast()
    const router=useRouter()
    const onClick = async () => {
        try {
        
    
          if (isPublished) {
            await axios.patch(`/api/registerCourse/${courseId}/unpublish`);
            toast({
                title:"the course is now unpublished now"
               })
            
          } else {
            await axios.patch(`/api/registerCourse/${courseId}/publish`);
           toast({
            title:"the course is now published now"
           })
          }
    
          router.refresh();
        } catch {
            toast({
                title:"failed to publish the course!"
               })
         
        }  
      }
      
  return (
    <div>
         {isPublished?(<ToggleRight color="green" size={35} onClick={()=>onClick()} />):(<ToggleLeft size={35} onClick={()=>onClick()} />)}



      </div>
  )
}
 