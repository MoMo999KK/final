"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    
  } from "@/components/ui/accordion"
  import ReactPlayer from "react-player"
import { UserCourse, UserCoursePart } from "@prisma/client"
import { Copy } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { useSession } from "next-auth/react"
import { useCallback } from "react"
   interface Props{
    initialData:UserCourse | null
  }
 
  
  export function DispayFreeParts({initialData}:Props) {
    const {toast}=useToast()
  
     return (
      <Accordion type="single" collapsible className="w-full">
          
        <AccordionItem value={initialData?.name as string}  >

          <AccordionTrigger>{initialData?.name}</AccordionTrigger>

          <AccordionContent className="flex">

            <ReactPlayer  controls url={initialData?.coverVideo as string}/>
          </AccordionContent>
            

         </AccordionItem>
         
        
         
       
      </Accordion>
    )
  }
  




 
 