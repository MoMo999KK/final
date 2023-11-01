import { getUsers } from '@/app/actions/get-allUsers'
import { UserTable } from '@/components/users/users-table'
import {  columns } from '@/components/users/users-column'
import React from 'react'

const ManageUsers =async () => {
  const users=await getUsers()
  return (
    <div className='w-5/6'>
      <UserTable columns={columns} data={users} />
    </div>
  )
}

export default ManageUsers