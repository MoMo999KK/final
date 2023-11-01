import { Separator } from "@/components/ui/separator"
import { db } from "@/lib/prismaDB"

 
const AdminUses = async() => {
  const admins=await db.user.findMany({
    where:{
      isAdmin:true
    },

  })
  const teachers=await db.user.findMany({
    where:{
      isInstructor:true
    }
  })
 
  return (
    <div className='w-3/5 mx-auto grid grid-cols-1 md:grid-cols-2'>
      <div className="">
        <h1>Admins</h1>
        <Separator/>
      
        {teachers.map((admin)=>(
          <div className=""key={admin.id}>{admin.name}</div>
        ))}
      </div>
      <div className="">
        <h1>Teachers</h1>
        <Separator/>
        {teachers.map((teacher)=>(
          <div className=""key={teacher.id}>{teacher.name}</div>
        ))}

      </div>
      

    </div>
  )
}

export default AdminUses