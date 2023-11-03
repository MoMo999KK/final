import { CoursesDataTable } from '@/components/course/CoursesDataTable'
import { Coursecolumns } from '@/components/course/courses-column'
import { db } from '@/lib/prismaDB'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
 

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
    <div className="mb-[700px]">
    <div className="w-full  mt-[100px]">
    <div className='w-4/6 md:w-5/6 mx-auto'>
     <Link href={"/adminstrator"}> <MoveLeft size={50} /> </Link>
      <CoursesDataTable data={courses} columns={Coursecolumns}/>
    </div>
    </div>
    </div>
  )
}

export default ManageCourses