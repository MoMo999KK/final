import React from 'react'
import { CreateCourseForm } from '../teacher/create-title'
import { findCurrenTeacher } from '@/app/actions/findCurrenTeacher'

const TeacherHeader = async() => {
  const teacher=await findCurrenTeacher()
  return (
    <div className='sm:h-[60px] md:h-[90px] flex gap-10 items-center'>
      <div className="">
      <p className='bold'>ساخت  دوره  جدید </p>
      </div>
      <div className="">
        <CreateCourseForm user={teacher}/>
      </div>
    </div>
  )
}

export default TeacherHeader