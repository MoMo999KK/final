import { getCurrentUser } from '@/app/actions/get-current-user'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import { HandelViewIncrement } from '@/components/course/handel-viewIncrement'
import { DispayFreeParts } from '@/components/courseDetails/DisplayFreeParts'
import { DispayChapters } from '@/components/courseDetails/Show-parts'
import CommentFeed from '@/components/courseDetails/comment-feed'
import { Commenthandler } from '@/components/courseDetails/comment-handler'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/prismaDB'
import { ArrowBigLeft } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Error from 'next/error'
import Link from 'next/link'
import { notFound } from 'next/navigation'
  

const CourseDetails = async({
  params
}: {
  params: { courseId: string }
}) => {
   
  if(!params.courseId){
    return notFound
  }
  // if ther is no sesion we should open the log in modal
  const session=await getServerSession(authOptions)
  const isBuyer=await db.user.findUnique({
    where:{
      email:session?.user?.email!,
      boughtCourses:{
        has:params.courseId

      }
     
    },
    
  })
   

  try {
    
  
   const singleCourse=await db.userCourse.findUnique({
       where:{
          id:params.courseId
      },
       include:{
           user:true,
           userCoursePart:true,
           comments:{
            include:{
              user:true,
              reply:true
            },
           
           }

       }
  })
const commentsCourse=await db.comments.findMany({
  where:{
    userCourseId:params.courseId,
    isHidded:false

  },
  include:{
    user:true,
    reply:{
       
      include:{
        user:true
      }
    }
    
  }
})
    

 

  return (
    <div className='max-w-[1270px]  mx-auto h-auto  '>
      <Navbar/>
     <HandelViewIncrement courseId={singleCourse?.id} />

     <div className="grid grid-cols-1 md:grid-cols-2 px-5 pt-12">
    
      <div className=" h-[200px] rounded-lg shadow-xl bg-blue-200 w-5/6 mx-auto p-8 flex flex-col items-center">
        <div className="text-center mt-1"><h1>Teacher:{singleCourse?.user?.name}</h1> </div>
        <div className="text-center mt-1"><h1>number of chapters:{singleCourse?.userCoursePart.length}</h1> </div>
        <div className="text-center mt-1"><h1>description:{singleCourse?.description || "Empty"}</h1> </div>
        <div className="text-center mt-1"><h1>price:{singleCourse?.isFree ? "Free" : singleCourse?.price}</h1> </div>



         </div>
      <div   >
        <div className="flex flex-col gap-5">
          <div className="">
            <DispayFreeParts initialData={singleCourse}/>
            <Separator/>
          </div>
          

          <div className="">
        
        <DispayChapters canSee={isBuyer} initialData={singleCourse}/>
        </div>
        

      </div>
      <div className='mt-[100px]' >
        <h1>Disscution Section</h1>
        <Separator/>
        <div className="">
          <CommentFeed dataProps={commentsCourse}  isbuyer={isBuyer}/>
        </div>
       
        <Commenthandler  initialData={singleCourse} isbuyer={isBuyer}/>
      </div>
      </div>
   

      
     </div>
   
       
            
            

 

    </div>
  )
} catch (error) {
  return(
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-blue-100">
    <p className='font-semibold'>  Failed To Bring Data</p>
    <Link className='flex' href={"/"}>Go Back Home <ArrowBigLeft/></Link>


    </div>
  )
 }
 }

export default CourseDetails