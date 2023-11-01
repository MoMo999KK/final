import { UserCourse } from "@prisma/client"

interface Props{
    initialDta:UserCourse[] | null
}
export const CourseItem = ({initialData}:Props) => {
  return (
    <div>
        {initialData.map((course:UserCourse)=>(
            <div className="" key={course.id}>

                {course.name}
            </div>
        ))}
    </div>
  )
}

 