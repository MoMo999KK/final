import { getSingleChapter } from '@/app/actions/find-current-chapter'
import { MessageSliderEdit } from '@/components/messageSlider/MessageSliderEdit'
import { ChapterEdit } from '@/components/teacher/chapters/chapterEdit'
import { db } from '@/lib/prismaDB'
const SliderSingle = async({params}:{params:{sliderId:string}}) => {
  const{sliderId}=params
   
  const slider=await db.messageNotification.findUnique({
    where:{
      id:sliderId
    }
  })
 
    
  
  return (
    <div className='flex flex-col w-5/6 bg-slate-500 mx-auto h-screen'>
hello
{slider?.message1}
<MessageSliderEdit initialData={slider}/>



     
    </div>
  )
}

export default SliderSingle
 