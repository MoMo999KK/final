
"use client"

import { User, UserCourse } from "@prisma/client"
import axios from "axios"
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { Separator } from "../ui/separator";

interface Props{
  isInstructor:boolean | null;
  isAdmin:boolean | null;
  initialData:User | null
  
}
export const UserTacherForm = ({isInstructor,initialData,isAdmin}:Props) => {
    const {toast}=useToast()
    const router=useRouter()
    const userId=initialData?.id
    
 
    const onClick = async () => {
        try {
        
    
          if (isInstructor) {
            await axios.patch(`/api/users/${userId}/unteacher`);
            toast({
                title:"Failed!",description:"the user is not a  teacher now"
               })
            
          } else {
            await axios.patch(`/api/users/${userId}/teacher`);
           toast({
            title:"SUccess!",description:"the user is  a teacher"
           })
          }
    
          router.refresh();
        } catch {
            toast({
                title:"Failed to Edit the user server Error the course!"
               })
         
        }  
      }
      const adminCLick = async () => {
        try {
        
    
          if (isAdmin) {
            await axios.patch(`/api/users/${userId}/unadmin`);
            toast({
                title:"the user is a teacher now"
               })
            
          } else {
            await axios.patch(`/api/users/${userId}/admin`);
           toast({
            title:"the user is no longer a teacher from now"
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
     
     <p>this will set the user to instructor</p>    {initialData?.isInstructor?(<ToggleRight color="green" size={35} onClick={()=>onClick()} />):(<ToggleLeft size={35} onClick={()=>onClick()} />)}
     <Separator/>
      <p>this will set the user to admin</p>   {initialData?.isAdmin?(<ToggleRight color="green" size={35} onClick={()=>adminCLick()} />):(<ToggleLeft size={35} onClick={()=>onClick()} />)}



      </div>
  )
}
 