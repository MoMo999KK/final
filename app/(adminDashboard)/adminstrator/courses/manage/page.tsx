 import { CoursesDataTable } from '@/components/course/CoursesDataTable'
import { Coursecolumns } from '@/components/course/courses-column'
import { db } from '@/lib/prismaDB'
 

const ManageCourses = async() => {
  const courses=await db.userCourse.findMany({
    orderBy:{
      createdAt:"asc"
    },
    include:{
      user:true
    }
  })
  return (
    <div className="w-full">
    <div className='w-2/6 mx-auto'>
      <CoursesDataTable data={courses} columns={Coursecolumns}/>
    </div>
    </div>
  )
}

export default ManageCourses