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
    <div className='w-full'>
        <p>Edit Your Course here</p>
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
     <p>CHapters Related</p>
     <div className="w-5/6 mx-auto">

        <div className="h-[300px] ">
        <CreateChapterName     courseId={currentCurse?.id} user={teacher}  />
        </div>
        <div className="">
          <ChapterNameList initialData={currentCurse?.userCoursePart} userId={currentCurse?.userId}/>
       
        </div>
     </div>
       

       
    </div>
  )
}

export default SingleCourseDetails