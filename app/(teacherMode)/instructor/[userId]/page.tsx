import { findCurrenTeacher } from '@/app/actions/findCurrenTeacher'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Sidebar from '@/components/teacherUi/Sidebar'
import TeacherHeader from '@/components/teacherUi/TeacherHeader'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/prismaDB'
import { ArrowBigLeft } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const TeacherProfile =async ({params}:{params:{userId:string}}) => {
  const session=await getServerSession(authOptions)
  const currentTeacher=await findCurrenTeacher()
  if(!session || !currentTeacher){
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
    <div className='w-full bg-slate-300 flex'>
       

        <Sidebar/>
       
      <div className="flex-1 sm:[h-60px] md:h-[90px]">
        <TeacherHeader/>
        <Separator/>
        <div className="">
          <p>همه دوره های شما </p>
          <div className="">
            {!courses.length &&( <div className="">Nothing yet</div> )}
            {
               courses.map((course)=>(
                <div className="flex flex-col" key={course.id}>
                name:  <p className='bg-slate-400'>{course.name}</p>
                price:  <span className='bg-slate-400'>{course.isFree? "is Free" : course.price}</span>
                view:  <p className='bg-slate-400'>{course.view}</p>
                Edit <Link href={`/instructor/${currentTeacher.id}/create/${course.id}`}> <button><ArrowBigLeft/></button></Link>


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

 