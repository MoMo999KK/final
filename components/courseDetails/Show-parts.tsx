"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    
  } from "@/components/ui/accordion"
  import ReactPlayer from "react-player"
import { User, UserCourse, UserCoursePart } from "@prisma/client"
import { Copy } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { useCallback } from "react"
import useLoginModalNow from "@/app/stores/useLogInModal"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
  interface Props{
    initialData:UserCourse | null
    canSee:User | null
  }
 
  
  export function DispayChapters({initialData,canSee}:Props) {
    const {toast}=useToast()
    const {userCoursePart}:any=initialData
    const {data:session}=useSession()
    const loginModal=useLoginModalNow()

    const onClick = useCallback(() => {
      if(!session){
        loginModal.onOpen();

      }
      
      if(session && !canSee){
        return <Button>checkout</Button>
      }
     
    }, [session,loginModal,canSee])
    return (
      <Accordion type="single" collapsible className="w-full">
            {userCoursePart.map((chapter:UserCoursePart )=>(
        <AccordionItem value={chapter.name} key={chapter?.id}>

          <AccordionTrigger>{chapter?.name}</AccordionTrigger>
          {canSee&&(

          <AccordionContent className="flex">
            <ReactPlayer  controls url={chapter.videoUrl as string}/>
           {chapter.resoursesLink&&(

 <div className="flex" onClick={()=> {navigator.clipboard.writeText(chapter?.resoursesLink as string),toast({title:"copied"})}} ><Copy />  {chapter?.resoursesLink} </div>  )}    </AccordionContent>)}
        </AccordionItem>
            ))}
        
       
        
      </Accordion>
    )
  }
  




 
 