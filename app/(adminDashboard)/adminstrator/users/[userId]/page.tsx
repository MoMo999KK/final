import { UserTacherForm } from '@/components/users/UserTeacherForm'
import { OPenCourseForm } from '@/components/users/open-courseUser'
import { UserBlockCommentForm } from '@/components/users/user-block-comment'
import { EditPasswordForm } from '@/components/users/user-password'
import { EditUserFullInfoForm } from '@/components/users/userInformationEdit'
import { db } from '@/lib/prismaDB'
import Image from 'next/image'
import React from 'react'

const UserProfileAdmin=async ({params}:{params:{userId:string}}) => {
  try {
    const user=await db.user.findUnique({
      where:{
        id:params.userId
      },
      
    
    })
    if(user)
    

   return (

    <div className='w-full mt-10 mx-auto ml-3'>
      <h1 className='text-center text-lg font-semibold mb-3'>set as admin/teacher/  block unblock/open a course for it/change password </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 mx-5 gap-x-4">
         <div className="">
          <h1>complete info</h1>
          <div className="flex flex-col bg-slate-300">
            <p>name:{user?.name}</p>
            <p>{user.email}</p>
            <p>{user?.address || "nothing added"}</p>
            <p>{user?.postcode || "nothing added"}</p>
            <p>{user?.phonenumber || "nothing added"}</p>
             
            <p> number of courses this user has:{user.boughtCourses.length}</p>
            <div className="">
          <h1>Block From Comennt</h1>
          <UserBlockCommentForm canComment={user.canComment} initialData={user}/>
          
         </div>
         <div className="">
          <h1>Set User As teacher</h1>
          <UserTacherForm isInstructor={user.isInstructor} isAdmin={user.isAdmin} initialData={user}/>
          
         </div>
           
           




          </div>


         </div>
         <div className="">
          <h1>change password for this user</h1>
          <EditPasswordForm initialData={user}/>
          <OPenCourseForm initialData={user}/>



          
         </div>
         <div className="">
          <h1>Edit Full Information</h1>
          <EditUserFullInfoForm initialData={user}/>
          
         </div>
        


      </div>
      



    </div>
  )
} catch (error) {
  throw new Error("failed to fetch user")
  
}
}

export default UserProfileAdmin