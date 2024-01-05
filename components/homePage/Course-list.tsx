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
import { useCallback, useEffect } from "react"
import ButtonCheckoutComponent from "../ButtonCheckoutComponent"
import { string } from "zod"
 

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
 {initialData?.map((course)=>(
  <div className="h-[350px] w-[300px] shadow-lg  " key={course.id}>
    <Image src={course?.image! || "/users/sample.jpg"} alt={course.name!} height={200} width={200} className="h-3/4 w-full object-cover"/>
   <div className=" flex justify-between gap-4 p-1 items-center flex-wrap overflow-hidden">
   <h1>{course.name}</h1>
   <p>price:{course.isFree? "is free" : course.price}</p>

   {course.isFree?   (
    <>
     {
      user?.boughtCourses.includes(course.id) ? (
        <div className="">    <Link href={`/courses/${course.id}`}> <Button className="mb-2">{"continue" }</Button></Link>
        </div>
      ):(
        <div className="">     <Button className="mb-2" onClick={()=>freeJoineHandler(course.id)}>{"join" }</Button>
        </div>
      )
     }
    </>
   
   ):(
    <ButtonCheckoutComponent price={course.price as number} email={session?.user?.email as string} courseId={course.id} teacherId={course.userId!}/>
   )}
   
    <Link className="" href={`/courses/${course.id}`}>Ssee details</Link> 
   </div>
  </div>
 ))}

        

 
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

 