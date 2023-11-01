import ManagSlider from '@/components/slider/HideSlider'
 import { CreateSlider } from '@/components/slider/create-slider'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/prismaDB'
import React from 'react'

const Slider =async () => {
  const messages=await db.messageNotification.findMany({
    orderBy:{
      createdAt:"asc"
    }
  })
  return (
    <div>
        <ManagSlider initialData={messages}/>
        <Separator/>
        <CreateSlider/>
    </div>
  )
}

export default Slider