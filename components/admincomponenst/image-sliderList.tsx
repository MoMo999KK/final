"use client"

import { ImageSlider } from "@prisma/client"
import Image from "next/image"
import { EditFormImageSlider } from "./EditFormImageSlider"
 
interface ImagesProps{
    images:ImageSlider[] | null
}

export default function CreateSliderImageList({images}:ImagesProps | null) {
    
  return (
    <div className="w-full flex-col">
        {images.map((image:ImageSlider)=>(
            <div className="w-[250px] h-[250px] mx-auto flex  " key={image.id}  >
                <div className="">

                <Image  src={image.imageUrl} height={300} width={300}alt="react next js learn"/>
                </div>
                <div className="">                <EditFormImageSlider initialData={image}/>
</div>


            </div>
        ))}
    </div>
  )
}
