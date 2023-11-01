import { UserCourse } from "@prisma/client"

interface Props{
    data:UserCourse[] | null
}

const HandelFreeCourses = ({data}:Props) => {
  return (
    <div>HandelFreeCourses</div>
  )
}

export default HandelFreeCourses