"use client"

import { User, UserCourse } from "@prisma/client"
import axios from "axios"
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface Props{
  canComment:boolean | null;
  initialData:User | null
  
}
export const UserBlockCommentForm = ({canComment,initialData}:Props) => {
    const {toast}=useToast()
    const router=useRouter()
    const userId=initialData
    
 
    const onClick = async () => {
        try {
        
    
          if (canComment) {
            await axios.patch(`/api/users/${userId}/cantComment`);
            toast({
                title:"the user is now blocked from comments now"
               })
            
          } else {
            await axios.patch(`/api/users/${userId}/canComment`);
           toast({
            title:"the user can comment now"
           })
          }
    
          router.refresh();
        } catch {
            toast({
                title:"failed to Edit the user server Error the course!"
               })
         
        }  
      }
      
  return (
    <div>
         {initialData?.canComment?(<ToggleRight color="green" size={35} onClick={()=>onClick()} />):(<ToggleLeft size={35} onClick={()=>onClick()} />)}



      </div>
  )
}
 