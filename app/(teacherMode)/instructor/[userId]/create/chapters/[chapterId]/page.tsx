 import { getSingleChapter } from '@/app/actions/find-current-chapter'
import { findCurrenTeacher } from '@/app/actions/findCurrenTeacher'
import { ChapterEdit } from '@/components/teacher/chapters/chapterEdit'
import { db } from '@/lib/prismaDB'
import {  MoveLeft } from 'lucide-react'
import Link from 'next/link'
const Chapterdetails = async({params}:{params:{chapterId:string}}) => {
  const{chapterId}=params
   
  const chapter=await db.userCoursePart.findFirst({
    where:{
      id:chapterId
    }
  })
  const teacher=await findCurrenTeacher()
  if(!teacher){
    return null
  }
 
    
  
  return (
    <>
    <div className='flex flex-col w-5/6 bg-slate-500  justify-between h-full mx-auto px-5'>
      <Link className='self-end mt-4 mx-8' href={`/instructor/${teacher.id}`}><MoveLeft size={57} /> </Link>
<h1 className='font-bold'>{chapter?.name}</h1>

<ChapterEdit  initialData={chapter}/>



     
    </div>
    </>
  )
}

export default Chapterdetails
// to dos add desc name videourl resourses links 
//videoDuration
//ResoursesLink
//videoUrl
//dscription