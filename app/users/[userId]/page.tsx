 

import { findCurrenAdmin } from '@/app/actions/findCurrentAdmin'
import { getCurrentUserProfile } from '@/app/actions/get-curenUserProfile'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Navbar from '@/components/Navbar'
import { ProfileTabs } from '@/components/profile-user/tabs'
 import { UserProfileSidebar } from '@/components/profile-user/userProfileSidebar'
import { db } from '@/lib/prismaDB'
import { UserCourse } from '@prisma/client'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { RedirectType, redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { useEffect, useState } from 'react'
 

const UserProfileHere =async ({
  params
}: {
  params: { userId: string }
}) => {
  
  const purchused=await db.purchuses.findMany({
    where:{
      userId:params.userId
    },
    include:{
      userCourse:true,

     
    }
  })
  const user=await getCurrentUserProfile(params.userId)
  if(user?.id !==params.userId){
    redirect("/")
  }
 
 
 

  
 
  
 
 
 

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
        {purchused.map((course)=>(

        <ProfileTabs key={course.id} initialData={course.userCourse} purchused={purchused.length}  user={user}/>
        ))}
    </div>
  )
}

export default UserProfileHere