import { findCurrenTeacher } from '@/app/actions/findCurrenTeacher'
import { getSingleCourse } from '@/app/actions/get-singleCOurse'
import { getCategories } from '@/app/actions/getAllCategories'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CreateCategory } from '@/components/admincomponenst/create-category'
import { IsFreeForm } from '@/components/admincomponenst/isFreeForm'
import { ChapterNameList } from '@/components/teacher/ChapterNameList'
import EditNameForm from '@/components/teacher/EditForm'
import { EditDescription } from '@/components/teacher/EditTextArea'
import { CreateChapterName } from '@/components/teacher/create-chapter-name'
import EditImageForm from '@/components/teacher/edit-cover-image'
import { ChoseCategoryForm } from '@/components/teacher/edit-ctaegory-form'
 import { EditPriceForm } from '@/components/teacher/edit-price'
import EditVideoForm from '@/components/teacher/edit-video-intro'
import { Separator } from '@/components/ui/separator'
import { Category, UserCourse } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
 
 
const SingleCourseDetails = async({params}:{params:{courseId:string}}) => {
  const{courseId}=params
    const currentCurse=await getSingleCourse(params.courseId)
    console.log("currentCourse",currentCurse)
    const teacher=await findCurrenTeacher()
    if(teacher?.id !== currentCurse?.userId){
      return null
    }
    const session=await getServerSession(authOptions)
    if(!session){
      redirect("/")
    }
    const allCategories=await getCategories()
   return (
    <div className="w-screen h-full ">
      <h1 className='text-3xl text-center my-3'>Edit Your Course Here</h1>
    <div className='w-full h-screen '>
        
    <div className='w-5/6 shadow-sm bg-slate-500 mx-auto grid grid-cols-1 md:grid-cols-2 '>
      <div className="">
        <EditNameForm initialData={currentCurse} courseId={currentCurse?.id}/>
        </div>
        <div className="">
        <EditPriceForm initialData={currentCurse} courseId={currentCurse?.id}/>
        </div>
        <div className="">
        <EditImageForm initialData={currentCurse} courseId={currentCurse?.id}/>
        </div>
       
        <div className="">
        <EditVideoForm initialData={currentCurse} courseId={currentCurse?.id}/>
        </div>
       
        <div className="">
        <EditDescription initialData={currentCurse} courseId={currentCurse?.id} />
        </div>
        <div className="">
        <ChoseCategoryForm initialData={currentCurse}  categories={allCategories} />
        </div>
    </div>
    <div className="w-5/6 bg-slate-600 mx-auto">
     <h1 className='text-white text-3xl font-extrabold text-center'>Chapters Related</h1>
     <Separator/>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-1 justify-between">
     <div className="w-2/6 h-[300px] shadow-md">


       
        <CreateChapterName     courseId={currentCurse?.id} user={teacher}  />
        
        </div>
        <div className="w-full h-[50px]">
          <ChapterNameList initialData={currentCurse?.userCoursePart} userId={currentCurse?.userId}/>
       
        </div>
        </div>
     </div>
       

       
    </div>
    </div>
  )
}

export default SingleCourseDetails