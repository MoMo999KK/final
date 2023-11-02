import { UserCourse } from "@prisma/client"

interface Props{
    initialDta:UserCourse[] | null
}
export const CourseItem = ({initialDta}:Props) => {
  return (
    <div>
        {initialDta?.map((course:UserCourse)=>(
            <div className="" key={course.id}>

                {course.name}
            </div>
        ))}
    </div>
  )
}

 