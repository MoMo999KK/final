  
 import { CoursesDataTable } from '@/components/course/CoursesDataTable'
import { Coursecolumns } from '@/components/course/courses-column'
import { db } from '@/lib/prismaDB'
import Link from 'next/link'

const ManageCourses = async() => {
  const courses=await db.userCourse.count({
  
    
  })
  const users=await db.user.count({
  
    
  })
  const purchuses=await db.purchuses.count({
  
    
  })
 
 
  return (
    <div className="w-full mb-[700px] mt-10">
    <div className='w-4/6 md:w-5/6 mx-auto'>
     <h5> total courses:{courses}</h5>
     <h5> total users:{users}</h5>
     <h5> total purchuses:{purchuses}</h5>
     <hr />
     <div className="">
    <Link href={"/adminstrator/courses"}><p>See Courses  </p></Link>
    <Link href={"/adminstrator/users"}>See users</Link>
    </div>
     
      
    </div>
   
     
    
   
      
       
    </div>
  )
}
export default ManageCourses
 

 

 
