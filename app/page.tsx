 

 
  import Navbar from "@/components/Navbar"
 import useSearchContainer from "./stores/use-SeatchContianer"
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
import { ForgetPasswordEmailCOmponent } from "@/components/forgetPasswordEmailform"
import Link from "next/link"
import { CoursList } from "@/components/homePage/Course-list"
import { getCurrentUser } from "./actions/get-current-user"
   

const Home = async() => {
  try {
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
 
   
    


   
   
 

  return (
   
  
       
    <div className="w-full bg-gradient-to-tr from-black to-slate-800 ">
 
    

     
 
        <div className="max-w-[1300px] h-screen flex flex-col   mx-auto ">
          <div className="">  <Navbar/></div>
        


          <div className="mt-2">  <div> <Slider/></div>
          
          
          </div>
          <div className=" h-screen bg-red-300 rounded-md">this is the main page</div>

          

 

<div className="flex-1 max-w-full mt-2">
  <h1 className="text-2xl text-green-100">Our Courses</h1>
  <div className="pt-2">
    <CoursList initialData={courses}   user={curentUser as any}  />
    </div>
 
 
 

  
  
  
  

 
 
 
  
 
 
  

</div>
  </div>
  <div className="h-full">
    <SearchContainer/>

 
</div>
  

    </div>
 
           
       
       
         
      
        
    
      
 
 
   
 
      
      
 
  )
} catch (error) {
  throw new Error("failed to load courses server error")
  
}
}

export default Home