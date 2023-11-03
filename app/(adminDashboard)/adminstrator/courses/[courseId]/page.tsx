import { CourseFreeForm } from '@/components/course/CourseFreeForm'
import { PriceChangeForm } from '@/components/course/PriceChange'
import { CoursePublishForm } from '@/components/course/course-publish'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/prismaDB'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CourseDetailsAdmin =async ({params}:{params:{courseId:string}}) => {
    const course=await db.userCourse.findUnique({
        where:{
            id:params.courseId
        },
        include:{
            user:true,
            comments:{
                include:{
                    user:true
                }
            }
        }
    })
    const students=await db.user.findMany({
        where:{
            boughtCourses:{
                has:params.courseId
              },
            }
    })
  return (
    <>
    <div className="w-full mt-12 mb-[700px]">
    <Link href={"/adminstrator"}> <MoveLeft size={50} /> </Link>
    <h1 className='text-center'>iChange Price and publish/unpublish oBS:dont forget to set the price to 0 if its Free</h1>
    <div className='w-4/6 grid grid-cols-1 md:grid-cols-2  mx-auto mt-7'>
        <div className="bg-slate-100 shadow-md text-center rounded-md w-[350px]">
            <h1 className='font-bold'>Name: <span className='bg-slate-400'>{course?.name}</span> </h1>
            <h1 className='font-bold'>Creator:<span className='bg-slate-400'>{course?.user?.name}</span> </h1>
            <h1 className='font-bold'>number of students:<span className='bg-slate-400'>{students.length}</span></h1>
            <h1 className='font-bold'>Price: <span className='bg-slate-400'>{course?.price}</span> </h1>
            <h1 className='font-bold'>Nimber of viwes: <span className='bg-slate-400'>{course?.view}</span> </h1>
             <h1 className='font-bold'>Number of Comments: <span className='bg-slate-400'>{course?.comments.length}</span> </h1>
 
        
        <Separator/>
        </div>
        <div className="bg-slate-100 shadow-md text-center rounded-md w-[350px] flex gap-2 items-center px-2 flex-col">
            <div className="flex items-center">

            <h1>{course?.isPublished ?(<div><p className='text-sm'>Set The Course As Unpublieshed</p></div>):(<div><p className='text-sm'>Set The Course As Published</p></div>)}</h1>
            <CoursePublishForm isPublished={course?.isPublished} courseId={course?.id}/>
            </div>
            <div className="flex gap-3">
            <h1>{course?.isFree ?(<div><p className='text-sm'>Set The Course As Paid</p></div>):(<div><p className='text-sm'>Set The Course As Free</p></div>)}</h1>
            <CourseFreeForm isFree={course?.isFree} courseId={course?.id}/>
            </div>
            <div className="flex gap-3 items-center">
                <p className='text-xs'>change price</p>
             <PriceChangeForm price={course?.price} courseId={course?.id}/>
            </div>
        </div>
        <div className="bg-slate-100 shadow-md text-center rounded-md w-[350px]">
            <h1>Comments</h1>
            <h1 className='font-bold'> <span className='bg-slate-400'>{course?.comments.map((comment)=>(
                <div className="flex flex-col" key={comment.id}>
                 <p> {comment.text} </p> <span>by:{comment?.user?.name}</span> 
                 <p> {comment.text} </p> <span>by:{comment?.user?.name}</span>
                 <p>status:{course.isPublished? "is published" :"not published yet"}</p>

                </div>
            ))}</span> </h1>
            
 
        

        </div>
        

    </div>
    </div>
    </>
  )
}

export default CourseDetailsAdmin