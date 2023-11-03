import { Separator } from "@/components/ui/separator"
import { UserTable } from "@/components/users/users-table"
import { db } from "@/lib/prismaDB"
import {  columns } from '@/components/users/users-column'
import { getUsers } from "@/app/actions/get-allUsers"
import Link from "next/link"
import { MoveLeft } from "lucide-react"

 
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
  const users=await getUsers()
 
  return (
    <div className='w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 mt-[70px] mb-[1000px]'>
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
      <div className='w-5/6'>
      <Link href={"/adminstrator"}> <MoveLeft size={50} /> </Link>
      <UserTable columns={columns} data={users} />
    </div>
      

    </div>
  )
}

export default AdminUses