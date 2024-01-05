import { findCurrenTeacher } from '@/app/actions/findCurrenTeacher'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NUmberOfBuyers from '@/components/teacher/chapters/number-of-buyers'
import Sidebar from '@/components/teacherUi/Sidebar'
import TeacherHeader from '@/components/teacherUi/TeacherHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/prismaDB'
import { ArrowBigLeft, MoveLeft } from 'lucide-react'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'


export async function generateStaticParams() {
  const response = await db.user.findMany({})
 
  return response.map(({ id }) => id);
}


export async function generateMetadata ({params}:{params:{userId:string}}) : Promise<Metadata> {
  const response = await db.user.findUnique({
    where:{
      id:params.userId,
      isInstructor:true
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



const TeacherProfile =async ({params}:{params:{userId:string}}) => {
  const session=await getServerSession(authOptions)
  const currentTeacher=await findCurrenTeacher()
  const profleOwner=currentTeacher?.id===params.userId
  if(!session || !currentTeacher || !profleOwner){
    redirect("/")
  }

  try {
    const courses=await db.userCourse.findMany({
      where:{
        userId:currentTeacher.id
      },
      include:{
        userCoursePart:true
      }
    })
      
    
   
    

 

  return (
    <div className='w-full bg-slate-300 flex h-full'>
       

         
       
      <div className="flex-1 mt-[100px] sm:[h-2000px] md:h-[200px]">
      
        <TeacherHeader />
       
         
        <div className="mt-[120px]">
          <p>همه دوره های شما </p>
          <div className="grid grid-cols-2 md:grid-cols-3 mx-auto mt-3">
            {!courses.length &&( <div className="">Nothing yet</div> )}
            {
               courses.map((course)=>(
                <div className="flex flex-col w-[300px] mx-3 px-3 border-solid border-cyan-100" key={course.id}>
                 <p className='bg-slate-400'>nam:{course.name}</p>
                price:  <span className='bg-slate-400'>{course.isFree? "is Free" : course.price}</span>
                view:  <p className='bg-slate-400'>{course.view}</p>
                Number Of Buyers:  <NUmberOfBuyers initialData={course.id}/>
                 <Link href={`/instructor/${currentTeacher.id}/create/${course.id}`}> <Button className='flex gap-1 mt-2'>Edit<MoveLeft /></Button></Link>

                 
                </div>
              ))
            }
            
          
          </div>
        </div>
      </div>
    </div>
  )
} catch (error) {
  throw new Error("failed to fetch the informations")
    
}
}

export default TeacherProfile

 