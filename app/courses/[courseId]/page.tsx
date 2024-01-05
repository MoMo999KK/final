import { getsingleCourse } from '@/actions'
import { getCurrentUser } from '@/app/actions/get-current-user'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
  import { HandelViewIncrement } from '@/components/course/handel-viewIncrement'
import { DispayFreeParts } from '@/components/courseDetails/DisplayFreeParts'
import { DispayChapters } from '@/components/courseDetails/Show-parts'
import { HandelLogin } from '@/components/courseDetails/chck-login'
import CommentFeed from '@/components/courseDetails/comment-feed'
 import { Commenthandler } from '@/components/courseDetails/comment-handler'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/prismaDB'
import { ArrowBigLeft } from 'lucide-react'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { cache } from "react";
 
import Link from 'next/link'



export async function generateStaticParams() {
  const courses=await db.userCourse.findMany({
    where:{
      isPublished:true
    }
  })

  return courses.map(({ id }) => id);

   
 
}
   



export async function generateMetadata({
  params
}: {
  params: { courseId: string }
}): Promise<Metadata> {
  const response = await getsingleCourse(params.courseId)


  return {
    title: response?.name,
    description:response?.description,

    openGraph: {
       images: [
         {
        url: response?.image!
        }
       ]
      }
   
  };
}



const CourseDetails = async({
  params
}: {
  params: { courseId: string }
}) => {
   
  
    const session=await getServerSession(authOptions) 
 
   const isBuyer=await db.user.findFirst({
    where:{
      email:session?.user?.email!,
      boughtCourses:{
        has:params.courseId

      }
     
    },
    
  })
  

 
   

  try {
    
  
   const singleCourse=await getsingleCourse(params.courseId)
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
const currentUser=await getCurrentUser()
    

 

  return (
    <div className='max-w-[1300px]  mx-auto h-auto '>
     
     <HandelViewIncrement courseId={singleCourse?.id}  />
    

     <div className="grid grid-cols-1 md:grid-cols-2 px-2 pt-12">
    
      <div className=" h-[200px] rounded-lg shadow-xl bg-blue-200 w-3/6 mx-auto p-3 flex flex-col items-center">
        <div className="text-center mt-1"><h1>Teacher:{singleCourse?.user?.name}</h1> </div>
        <div className="text-center mt-1"><h1>number of chapters:{singleCourse?.userCoursePart.length}</h1> </div>
        <div className="text-center mt-1"><h1>description:{singleCourse?.description || "Empty"}</h1> </div>
        <div className="text-center mt-1"><h1>price:{singleCourse?.isFree ? "Free" : singleCourse?.price}</h1> </div>



         </div>
      <div   >
        <div className="flex flex-col gap-3">
          <div className="">
            <DispayFreeParts initialData={singleCourse}/>
            <Separator/>
          </div>
        


          {!session || !isBuyer ? ( <div className="">
            <HandelLogin initialData={singleCourse}/>

        
      </div>
        ):(   

       
          <div className="w-full">
        
        <DispayChapters canSee={isBuyer} initialData={singleCourse}/>
        </div>
        

        )}
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