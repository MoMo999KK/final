"use client"

import { User, UserCourse, UserCoursePart } from "@prisma/client"
import Link from "next/link"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import HandelFreeCourses from "../freeCourses/handel-joinFree"
import Image from "next/image"
import useLoginModalNow from "@/app/stores/useLogInModal"
import { ArrowBigRight, MoveRight } from "lucide-react"
import { useSession } from "next-auth/react"
 

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
    <div className="max-w-[1300px] mx-auto  grid grid-cols-2 md:grid-cols-3 md:mx-7 md:gap-12 h-auto">
      {initialData?.map((course)=>(

        <div className="max-w-sm w-full lg:max-w-full lg:flex h-[300px] border-l-2 border-l-black"  key={course.id}>
  <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${course?.image} )` || "/users/sample.jpg" }}  >
  </div>
  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div className="mb-8">
    {!user?.boughtCourses.includes(course.id) && !course.isFree &&  (
      <p className="text-sm text-gray-600 flex items-center">
        <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
        </svg>
          </p>
        )}
        {user?.boughtCourses.includes(course.id)? <div className=""><Button onClick={()=>router.push(`/courses/${course.id}`)} variant={"ghost"}>Continue</Button> </div>:(<div className="">
          {course.isFree ? (<div className="mr-6"><Button variant={"outline"} onClick={()=>{freeJoineHandler(course.id)}}>Free</Button></div> ) :(<div className="flex gap-2" >
            <p>{course.price}</p>
            {course.prviousPrice! > 0 &&(  <div className="">  <p className="line-through bg-red-200">{course.prviousPrice}</p></div>  ) }
      



          </div> )}


        </div> )
        }
      <div className="text-gray-900 font-bold text-xl mb-2">{course.name}</div>
      <p className="text-gray-700 text-base">{course.description}</p>
    </div>
    <div className="flex items-center">
     
       <div className="text-sm">
        <p className="text-gray-900 leading-none">instructor</p>
        <p className="text-gray-600 flex cursor-pointer" onClick={()=>router.push(`/courses/${course.id}`)}> see details<MoveRight /></p>
      </div>
    </div>
  </div>
</div>
  ))}
        

 
    </div>
  )
}

 