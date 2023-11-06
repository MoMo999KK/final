"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
//1-we want to load all messages if there is not any message we show buton to create conversation
//and we create a conversation and get as response 
//2-we cretae a conversation with that and notify the user that has been created


export const Chattbox=()=>{
  const {data:session}=useSession()
  const {toast}=useToast()
 

  //1
  const createConversation=async()=>{
    try {
      
      const response=await axios.post("/api/conversation")
      //2
      toast({title:"created a conversation with admin now you can chatt!"})

    } catch (error) {
      toast({title:"faled to create a conversation with admin"})
      
    }
  }








    return(
        <div className="w-80 h-[400px] flex flex-col border shadow-md bg-white">
  <div className="flex items-center justify-between border-b p-2">
  
    <div className="flex items-center">
      <Image className="rounded-full w-10 h-10"
        src="/users/sample.jpg"  alt="user" height={50} width={50}/>
      <div className="pl-2">
        <div className="font-semibold">
          <a className="hover:underline" href="#">{session?.user?.name}</a>
        </div>
        <div className="text-xs text-gray-600">Online</div>
      </div>
    </div>
  
    <div>
      <a className="inline-flex hover:bg-indigo-50 rounded-full p-2" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </a>

      <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  
  </div>

  <div className="flex-1 px-4 py-4 overflow-y-auto">
 

    <div className="flex items-center mb-4">
      <div className="flex-none flex flex-col items-center space-y-1 mr-4">
      <Image className="rounded-full w-10 h-10"
        src="/users/sample.jpg"  alt="user" height={50} width={50}/>
        <a href="#" className="block text-xs hover:underline">John Doe</a>
      </div>
      <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>

    
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
        
      </div>
    </div>

  

    <div className="flex items-center flex-row-reverse mb-4">
      <div className="flex-none flex flex-col items-center space-y-1 ml-4">
      <Image className="rounded-full w-10 h-10"
        src="/users/sample.jpg"  alt="user" height={50} width={50}/>
        <a href="#" className="block text-xs hover:underline">Jesse</a>
      </div>
      <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur
          adipisicing elit.</div>
 
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
        
      </div>
    </div>

   

    <div className="flex items-center mb-4">
      <div className="flex-none flex flex-col items-center space-y-1 mr-4">
      <Image className="rounded-full w-10 h-10"
        src="/users/sample.jpg"  alt="user" height={50} width={50}/>
        <a href="#" className="block text-xs hover:underline">John Doe</a>
      </div>
      <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
        <div>Lorem ipsum dolor sit amet, consectet  <Button >create conversation</Button> </div>   
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
              
      </div>
    </div>
  </div>

  <div className="flex items-center border-t p-2">
    <div>
      <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
 
    <div className="w-full mx-2">
      <input className="w-full rounded-full border border-gray-200" type="text" value="" placeholder="Aa" autoFocus />
    </div>

 

    <div>
      <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
 
  </div>
</div>

    )
}









