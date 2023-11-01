import { Separator } from '@/components/ui/separator'
import React from 'react'
import { UserChattContainer } from './user-chatt-container'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const ChattSidebar = () => {
  return (
    <div className='w-full ml-4 mt-0 overflow-hidden'>
      <div className=" w-full md:w-5/6 bg-red-100 relative">

       <Input className='w-full overflow-hidden' placeholder='search by email'/>
       <Search className='absolute top-2 left-0 border-r-2 md:left-5 md:absolute md:right-0 placeholder:right-0 md:placeholder:absolute md:placeholder:left-0 md:border-l-2' />
      </div>
        <Separator/>

        <UserChattContainer/>
      
    </div>
  )
}

export default ChattSidebar