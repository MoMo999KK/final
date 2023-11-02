import React from 'react'
import { CreateCourseForm } from '../teacher/create-title'
import { findCurrenTeacher } from '@/app/actions/findCurrenTeacher'

const TeacherHeader = async() => {
  const teacher=await findCurrenTeacher()
  return (
    <div className='sm:h-[60px] md:h-[90px] flex gap-10 items-center'>
    
      <div className="w-[200px] h-[200px] mx-5">
      <h1 className='bold'> Create A New Course </h1>

        <CreateCourseForm user={teacher}/>
      </div>
    </div>
  )
}

export default TeacherHeader