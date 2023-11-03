"use client"
"use client"

import { MessageNotification } from "@prisma/client"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
 
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";



import { getCurrentUser } from "@/app/actions/get-current-user"
import { Slider } from "./home/Slider"

 

const HeroSection = () => {
  const [messages,setMessages]=useState<MessageNotification[]>([])
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setSlide((prev) => (prev === messages.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, [messages.length]);



  useEffect(()=>{
    const fchData=async()=>{
         const response=await axios.get("/api/slider")
    setMessages(response.data)

     }
      fchData()

},[])
   
  return (
     
    <div className= "bg-[url('/users/sample.jpg')] md:h-[60vh] h-[30vh] bg-cover bg-opacity-0 flex items-center justify-center bg-gray-600 rounded-md" >
     
      { messages.length > 0 &&  messages.map((item, idx) => {
    return (
    <div             className={slide === idx ? "text-5xl text-center uppercase shadow-2xl pl-2 tracking-[120px] leading-30 bg-slate-50/50 rounded-md text-white decoration-slate-500" : "hidden"}
    key={idx}>{item.message1}</div>
    );
  })}
  
  <span className="indicators leading-8">
    {messages.map((_, idx) => {
      return (
        <button
          key={idx}
          className={
            slide === idx ? "indicator uppercase" : "indicator indicator-inactive"
          }
          onClick={() => setSlide(idx)}
        ></button>
      );
    })}
  </span>
  
     
  </div>
  )
}

export default HeroSection



 

 

 