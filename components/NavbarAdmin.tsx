"use client"

import { ChevronDown, ChevronUp, Menu, X } from "lucide-react"
import { UserNav } from "./user-nav"
import { useState } from "react"
import { User } from "@prisma/client"
interface Props{
    user:User | null
}

function NavbarAdmin({user}:Props) {
    const [openDrawer,setOpenDrawer]=useState(false)
    const [showMore,setShowMore]=useState(false)
    const [showMoreCourses,setShowMoreCourses]=useState(false)

  return (
    <>
    <div className=" px-4">
         
        <UserNav user={user} /> 
       <Menu className="absolute left-8 top-4 md:hidden" onClick={()=>setOpenDrawer(!openDrawer)}/>  

    
     
    </div>
    {openDrawer&&(
        <>
        
        <X className="absolute  left-[50%] overflow-y-hidden z-[999]" color="white" size={35} onClick={()=>setOpenDrawer(false)}/>
    <div className="overflow-hidden  md:hidden w-[240px] absolute h-screen rounded-tr-full border-r-sky-800 z-50 left-0 top-0 shadow-lg bg-blue-400">
        <div className=" px-10 pt-[150px]">
            <hr className="w-full mt-3" />
           
            <div className="flex flex-col px-5 mt-3 relative">
                <div className="">


            <h1 onClick={()=>setShowMore(!showMore)}>  users  </h1><span className="absolute left-12 top-0">{showMore ?(<ChevronDown/>):null}</span>
            {showMore&&(<>
            <p>manage users</p>
            <p>create user</p>
            <p>admins</p>
            </>
            )}
            </div>
            <div className="">


<h1 onClick={()=>setShowMoreCourses(!showMoreCourses)}>  Courses  </h1><span className="absolute left-12 top-6">{showMoreCourses ?(<ChevronDown/>):null}</span>
{showMoreCourses&&(<>
<p>All courses</p>
<p>Moast Viewed</p>
<p>Pending Courses</p>
</>
)}
</div>

         

            
            <h1>notifications</h1>
            <p>messages</p>
            
            </div>

        </div>
    </div> </>)}
    </>
  )
}

export default NavbarAdmin