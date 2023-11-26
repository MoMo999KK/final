 
 
 import useSearchContainer from "./stores/use-chattModal"
import { Currency, Search, X } from "lucide-react"
import { CreateCourseForm } from "@/components/teacher/create-title"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/home/Slider"
import useSlider from "./stores/use-Slider"
import { useEffect, useState } from "react"
import axios from "axios"
import Footer from "@/components/Footer"
import Image from "next/image"
import { UserCourse } from "@prisma/client"
import SearchContainer from "@/components/SearchContainer"
import { db } from "@/lib/prismaDB"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
 import Link from "next/link"
import { CoursList } from "@/components/homePage/Course-list"
import { getCurrentUser } from "./actions/get-current-user"
import { url } from "inspector"
import HeroSection from "@/components/hero-section"
   

const Home = async() => {
 
    const courses=await db.userCourse.findMany({
      where:{
        isPublished:true
        
      },
      orderBy:{
        createdAt:"asc"
      },
      include:{
        user:true,
        
         
      }
    })
    const curentUser=await getCurrentUser()
    console.log(curentUser)
 
   
    


   
   
 

  return (
   
  
       
    <div className="w-full  h-full ">
 
    

     
 
    

         
        


        <HeroSection/>
<div className="mt-7 mx-auto ">
  <SearchContainer/>
  
</div>
          

 

<div className="flex-1 max-w-full mt-[80px]">
  <h1 className="text-2xl text-green-100">Our Courses</h1>
  <div className="pt-2">
    <CoursList initialData={courses}   user={curentUser as any}  />
  
    
 
 

  
  
  
  

 
 
 
  
 
 
  

</div>
  </div>
 
  

    </div>
 
           
       
       
         
      
        
    
      
 
 
   
 
      
      
 
  )
 
   

}

export default Home