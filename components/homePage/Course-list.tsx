"use client"

import { User, UserCourse, UserCoursePart } from "@prisma/client"
import Link from "next/link"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
 import Image from "next/image"
import useLoginModalNow from "@/app/stores/useLogInModal"
import { ArrowBigRight, MoveRight } from "lucide-react"
import { useSession } from "next-auth/react"
import { cursorTo } from "readline"
 

interface Props{
  initialData:UserCourse[] | null;
  user:User | null
 
}


export const CoursList = ({initialData,user}:Props) => {
  const {toast}=useToast()
  const router=useRouter()
  const loginModal=useLoginModalNow()
  
  //postin gboth userId and the course id that we wanna opne for the user
  const userId=user?.id
 const {data:session}=useSession()
 const {data:token}=useSession()
 

 
   


 // const allFreecourses=initialData?.filter((course)=>course.isFree ===true)
   


  const freeJoineHandler=async(courseId:string)=>{
    if(!session){
      loginModal.onOpen()
      }else{

        
        
        try {
          const response=await axios.post(`/api/free/${courseId}`)
          toast({title:"joied succesfull!"})
          router.refresh()
          
          
          
        } catch (error) {

          
          
        }
      }
  }
 

  

  return (
    <div className="max-w-[1100px] mx-auto  grid grid-cols-2 md:grid-cols-3">
 l
        

 
    </div>
  )
}





{/*

 {!user?.boughtCourses.includes(course.id) && !course.isFree &&  (
      <p className="text-sm text-gray-600 flex items-center">
       Continue
          </p>
        )}
        {user?.boughtCourses.includes(course.id)? <div className=""><Button onClick={()=>router.push(`/courses/${course.id}`)} variant={"ghost"}>Continue</Button> </div>:(<div className="">
          {course.isFree ? (<div className="mr-6"><Button variant={"outline"} onClick={()=>{freeJoineHandler(course.id)}}>Free</Button></div> ) :(<div className="flex gap-2" >
            <p>{course.price}</p>
            {course.prviousPrice! > 0 &&(  <div className="">  <p className="line-through bg-red-200">{course.prviousPrice}</p></div>  ) }
      



          </div> )}


        </div> )
        }


*/}

 