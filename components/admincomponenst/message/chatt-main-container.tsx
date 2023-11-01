import { Separator } from '@/components/ui/separator'
import React from 'react'
import ChattHeaderAdmin from './ChattHeaderAdmin'
import ChattBodyAdmin from './ChattBodyAdmin'
import { Button } from '@/components/ui/button'

const ChattMainContainer = () => {
  return (
    <div className='h-screen '>
        <div className="sticky top-0 h-[45px] z-30 shadow-md">

        header who we are chatting with
     
        </div>
        <div className='h-screen flex flex-col'>
        <div className=" h-[350px] md:h-[550px]">
        <ChattBodyAdmin/>
        </div>
         <Separator/>
         <div className="mx-auto w-full flex pb-3 px-3">
            <Button className='bg-blue-400'>Send</Button>
            <input type="text" className='w-4/6 mx-auto h-13' placeholder='say something'/>
            
         </div>
         </div>

    </div>
  )
}
export default ChattMainContainer