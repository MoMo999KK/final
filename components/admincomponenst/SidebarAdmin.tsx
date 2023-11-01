 "use client"

import { cn } from "@/lib/utils"
import { Bell, ChevronDown, MessageSquareDashed, PanelRightClose, Sliders } from "lucide-react"
import { useState } from "react"
import { Separator } from "../ui/separator"
import Link from "next/link"


const SidebarAdmin = () => {
  const [showMore,setShowMore]=useState(false)
  const [showMoreCourses,setShowMoreCourses]=useState(false)

  return (
    <div className={"flex flex-col gap-7"}>
     <div className={showMoreCourses?"border-r-800 border-s-orange-300":""}>


<h1 onClick={()=>setShowMoreCourses(!showMoreCourses)}>  Courses  </h1>
{showMoreCourses&&(<>
  <span className=" absolute top-[99px] right-[5%]">{showMoreCourses &&(<ChevronDown className="mr-1"/>)}</span>
<Link className="hover:bg-blue-400 hover:underline" href={"/adminstrator/courses"}><p>All courses</p></Link>
<Link  className="hover:bg-blue-400 hover:underline" href={"/adminstrator/courses/manage"}><p>manage Curses</p></Link>
<Link  className="hover:bg-blue-400 hover:underline" href={"/adminstrator/imageSlide"}><p>manage image slider</p></Link>
 
</>
)}
</div>
<Separator/>
<div>


<h1 onClick={()=>setShowMore(!showMore)} >  Users  </h1>
{showMore&&(<>
  <span className={showMoreCourses?"absolute top-[230px] right-20":"absolute right-[60px] top-[180px]"}>{showMore &&(<ChevronDown/>)}</span>
<Link className="hover:bg-blue-400 hover:underline" href={"/adminstrator/users"}><p>All usrs</p></Link>
<Link className="hover:bg-blue-400 hover:underline" href={"/adminstrator/users/create"}><p>Create A Users</p></Link>
<Link className="hover:bg-blue-400 hover:underline" href={"/adminstrator/users/manage"}><p>Edit/Block</p></Link>
 
 
</>
)}
</div>
<Separator/>

         

            
            <Link href={"/adminstrator/notifications"} className="flex gap-2 "><h1>Notifications</h1><Bell className="hover:rotate-45"/></Link>
            <Separator/>
           <Link href={"/adminstrator/messages"} className="flex gap-2" > <p>Messages</p><MessageSquareDashed className="hover:bg-blue-400" color="blue"/></Link>
           <Separator/>
           <Link href={"/adminstrator/slider"} className="flex gap-2" > <p>Slider</p><PanelRightClose className="hover:bg-blue-400" color="blue"/></Link>

      
    


    </div>
   
  )
}

export default SidebarAdmin