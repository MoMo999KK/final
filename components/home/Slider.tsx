"use client"

import { MessageNotification } from "@prisma/client"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
 
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
 
 

export const Slider = () => {
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
   
 
  return    (
    <div className="flex relative w-full justify-center items-center h-[40px] bg-[#dedede] z-40 ">
       
      {messages.map((item, idx) => {
        return (
        <div             className={slide === idx ? "text-lg" : "hidden"}
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
  );
}

 