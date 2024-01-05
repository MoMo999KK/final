 

 import { getCurrentUserProfile } from '@/app/actions/get-curenUserProfile'
import { getCurrentUser } from '@/app/actions/get-current-user'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
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

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Purchuses, User } from "@prisma/client"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import Link from "next/link"
import { Metadata } from 'next'




export async function generateStaticParams() {
  const users=await db.user.findMany({
     
  })

  return users.map(({ id }) => id);

   
 
}

export async function generateMetadata({
  params
}: {
  params: { userId: string }
}): Promise<Metadata> {
  const response = await db.user.findUnique({
    where:{
      id:params.userId
    }
  })
 
  return {
    title: response?.name,
    description:response?.email,
    // openGraph: {
    //   images: [
    //     {
    //       url: post.imageUrl
    //     }
    //   ]
    // }
  };
}
 
 

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
  const Ouruser=await getCurrentUser()
 
 
 

  
 
  
 
 
 

    {/*
  const session=await getServerSession(authOptions)
  
  )
  const  admin=await findCurrenAdmin()

    if(!user || session || admin){
      throw new Error("you cant view others profile")
      redirect("/")
    }

  */}
     
  ///<ProfileTabs key={course.id} initialData={course.userCourse} purchused={purchused.length}  user={user}/>

  return (
    <div className='w-full h-full overflow-hidden mt-12 mb-[600px]'>
      
        <Tabs defaultValue="account" className="w-[600px] md:w-[1200px]  mx-auto">
        <TabsList className="grid w-full grid-cols-2" >
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="user">Account Information</TabsTrigger>
          </TabsList>
        {purchused.length > 0 ?     purchused.map((course)=>(
        
          <TabsContent value="courses" key={course?.id}>
               <TabsContent value="courses">
        <Card>
          <CardHeader>
            <CardTitle>Number Of Courses :<span className="ml-2 bg-slate-500 p-2 rounded-md">{user.boughtCourses.length}</span></CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2 w-full h-full grid grid-cols-2 md:grid-cols-3 mx-auto">
            <div className="h-[250px] w-[250px] shadow-md bg-blend-hard-light ">
                <h1>name:{course?.userCourse?.name}</h1>
               <Link href={`/courses/${course?.userCourse?.id}`} className="flex "><ArrowBigRight/> Go </Link>
             
            </div>
           
          </CardContent>
         
        </Card>
      </TabsContent>
            
          </TabsContent>

)):"nothing yet"}
</Tabs>
    </div>
  )
}

export default UserProfileHere