import { getImagesSider } from '@/app/actions/fetch-images-slider'
import { CreateSliderImage } from '@/components/admincomponenst/create-image-slider'
import CreateSliderImageList from '@/components/admincomponenst/image-sliderList'
import { ImageSlider } from '@prisma/client'
 import React from 'react'

const ImageSliderPage = async() => {
  const images:ImageSlider[] | null=await getImagesSider()
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 border-solid border-blue-950'>
      <div className="bg-blue-100">
      <CreateSliderImage/>
      </div>
      <div className="">

      <CreateSliderImageList images={images}/>
      </div>
    </div>
  )
}

export default ImageSliderPage