 

import { findCurrenAdmin } from '@/app/actions/findCurrentAdmin'
import { getCurrentUserProfile } from '@/app/actions/get-curenUserProfile'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Navbar from '@/components/Navbar'
import { UserProfileSidebar } from '@/components/profile-user/userProfileSidebar'
import { db } from '@/lib/prismaDB'
import { UserCourse } from '@prisma/client'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { useEffect, useState } from 'react'
 

const UserProfileHere =async ({
  params
}: {
  params: { userId: string }
}) => {
  const userCourse=await db.purchuses.findMany({
    where:{
      userId:params.userId
    },
    include:{
      user:true
    }
  })
 
 

  
 
  
 
 
 

    {/*
  const session=await getServerSession(authOptions)
  
  )
  const  admin=await findCurrenAdmin()

    if(!user || session || admin){
      throw new Error("you cant view others profile")
      redirect("/")
    }

  */}
     

  return (
    <div className='w-full h-full overflow-hidden '>
      <div className="h-[80px]">
        <Navbar/>
        </div>
        <div className="flex">
        <div className="hidden md:flex w-[300px]  rounded-md bg-emerald-400 h-screen top-0 right-0 z-50">
         <UserProfileSidebar/>
        </div>
     
      <div className="bg-red-300 w-full  h-screen flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2">
       <div className="w-2/6">
        <Image  src={"/images/messi.jpg"} width={200} height={200} alt="f" />
       </div>
       <div className="">
       number of COurses: {userCourse.length}
        </div>
      </div>
      </div>
       

    </div>
    </div>
  )
}

export default UserProfileHere