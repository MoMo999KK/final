 
 
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
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt blanditiis ea, inventore eius expedita et labore voluptatibus numquam repellendus ex rem praesentium, perspiciatis odit aut vel sit, sint ut optio.
    Aut, et voluptas odio asperiores sapiente, dolores ea, deserunt ducimus consequatur fuga consequuntur. Aspernatur sapiente recusandae nihil incidunt? Odio ratione reiciendis ipsa quae tempora possimus enim dolores modi voluptatem doloremque.
    Ex odit, accusantium rerum neque, non sunt reprehenderit, iste possimus accusamus id expedita rem nesciunt ratione sed veritatis eum quis harum? Doloribus, dolores id? Suscipit, amet. Quibusdam dicta neque consequatur.
    Possimus facere soluta consequuntur, ad sunt provident commodi reprehenderit aliquid odit quaerat optio labore illo molestias saepe, accusamus officiis. Iusto tempore sint nisi minima neque, sed esse itaque officiis voluptatem!
    Id itaque molestias voluptate voluptates beatae distinctio tempore aliquid voluptatibus fugit eos, inventore et reprehenderit neque iusto voluptas temporibus ullam? Ipsa consectetur molestiae neque explicabo necessitatibus impedit corporis, commodi et.
    Libero nihil deserunt quaerat! Quas asperiores iusto iure quia harum animi earum tenetur natus veritatis at et unde dolorum nobis, non labore sapiente? Voluptatem nobis soluta ea deserunt obcaecati magnam?
    Animi nihil nulla tenetur labore magni hic laborum sed sapiente quibusdam facere eum, repudiandae id suscipit nemo harum dignissimos minus odit quaerat ullam nisi natus cumque laboriosam. Debitis, maiores nemo!
    Quibusdam, debitis sapiente. Quam excepturi delectus illum, quia voluptatum expedita nulla ipsa exercitationem inventore illo placeat. Nulla nemo, commodi magnam repellendus rerum quisquam labore fuga. Asperiores esse totam nam adipisci!
    Accusantium, nemo ex ad reiciendis corrupti ducimus aperiam illum magnam explicabo odit ratione pariatur dolorum animi quas nihil molestias doloribus. Ut fuga soluta voluptatem unde labore beatae earum est distinctio.
    Architecto enim doloremque iusto consectetur commodi, earum qui eaque recusandae incidunt debitis distinctio quasi libero aliquam. Facere ipsam, labore officia earum nobis eius dignissimos? Error eum non tenetur sunt explicabo!
    Tempore, vitae, praesentium cum quidem fugit dolor distinctio soluta est velit neque totam quod consectetur eaque dolorum incidunt illo quo dicta quam quis. Inventore corrupti sit odit quae necessitatibus aut?
    Sunt, iste nulla! Magni vitae recusandae facilis velit, illum eaque ad reiciendis vero totam maxime ducimus deserunt molestias accusantium voluptatum amet dicta labore consequatur similique sed culpa nulla? Delectus, sed?
    
 
 

  
  
  
  

 
 
 
  
 
 
  

</div>
  </div>
 
  

    </div>
 
           
       
       
         
      
        
    
      
 
 
   
 
      
      
 
  )
 
   

}

export default Home