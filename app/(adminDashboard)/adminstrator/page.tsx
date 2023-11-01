import { findCurrenAdmin } from '@/app/actions/findCurrentAdmin'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CreateCategory } from '@/components/admincomponenst/create-category'
import { Separator } from '@/components/ui/separator'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminMainPage = async() => {
  const session=await getServerSession(authOptions)
  const admin=await findCurrenAdmin()
  if(!admin || session){
    redirect("/")
  }
  return (
    <div className='w-full h-full '>
       
       <div className="w-full grid grid-cols-3 px-10 pb-4">
        <div className="border-solid border-red-100 shadow-md shadow-orange-300 w-[100px] md:w-[200px] h-[100px] text-center rounded-lg flex items-center gap-2 justify-center  hover:bg-blue-400"><p>Total Users</p></div>
        <div className="border-solid border-red-100 shadow-md shadow-orange-300  w-[100px] md:w-[200px] hover:bg-blue-400 text-center rounded-lg flex items-center gap-2 justify-center">Total sales</div>
        <div className="border-solid border-red-100 shadow-md shadow-orange-300  w-[100px] md:w-[200px] hover:bg-blue-400 text-center rounded-lg flex items-center flex-col gap-2 justify-center"><p className='text-sm'> earned</p><hr /> <p className='text-sm'>Teachers</p> </div>

       </div>
       <Separator />
    </div>
  )
}

export default AdminMainPage