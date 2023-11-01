"use client"

import { UserCourse } from "@prisma/client"
import axios from "axios"
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface Props{
    isFree:boolean  | undefined
    courseId:string | undefined
}
export const CourseFreeForm = ({isFree,courseId}:Props) => {
    const {toast}=useToast()
    const router=useRouter()
    const onClick = async () => {
        try {
        
    
          if (isFree) {
            await axios.patch(`/api/registerCourse/${courseId}/paid`);
            toast({
                title:"the course is now free"
               })
            
          } else {
            await axios.patch(`/api/registerCourse/${courseId}/free`);
           toast({
            title:"the course is now paid "
           })
          }
    
          router.refresh();
        } catch {
            toast({
                title:"failed to Edit the course srver error the course!"
               })
         
        }  
      }
      
  return (
    <div>
         {isFree?(<ToggleRight color="green" size={35} onClick={()=>onClick()} />):(<ToggleLeft size={35} onClick={()=>onClick()} />)}



      </div>
  )
}
 