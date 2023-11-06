{/*


"use client"
import { Eye, SendHorizontal, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input } from '../../ui/input'
import useChattContainer from '@/app/stores/use-chattModal'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { MessageChatt } from '@prisma/client'
import { ChattInput } from './ChattInput'
*/}
 //1-we want to load all messages if there is not any message we show buton to create conversation
//and we create a conversation and get as response 
//2-we cretae a conversation with that and notify the user that has been created
//getting the messages by response
 // if there is a conversation we load it by props
 {/*
const ChattBox = () => {
  const chattContainer=useChattContainer()
  const {data:session}=useSession()
  const {toast}=useToast()

  //const [getResponse,setResponse]=useState<FullConversationType | null>(null)
  const email= session?.user?.email
 

  //1
  const createChatt=async()=>{
    try {
      
      const response=await axios.post("/api/conversation",email)
     
     

      //2
      toast({title:"created a conversation with admin now you can chatt!"})

    } catch (error) {
      toast({title:"faled to create a conversation with admin"})
      
    }
  }


 // useEffect(()=>{
 //   const getConversation=async()=>{
  //  //  try {
     //   const res=await axios.post(`/api/chatts/${session?.user?.email}`)
       // setResponse(res.data)
       // console.log(res.data)
       
       //  } catch (error) {
         
         //   }
         
         // }
         // getConversation()
         
         
   //},[session?.user])

   
   
   
  */}
  {/*



  return (
    <div className="h-[505px] bg-indigo-50 flex flex-col items-center justify-center rounded-md z-[999]">
    <div className="w-[370px] h-[500px] flex flex-col border shadow-md to-black">
    <div className="flex items-center shadow-md mb-2 py-3 px-3 ">
    <Image className="rounded-full w-10 h-10 " src="/users/user.png"  alt='user avatar' height={40} width={40}/>
    <div className="pl-2 flex items-center gap-4">
    <div className="font-semibold">
    <Link className="hover:underline text-sm" href="#">Admin</Link>
    </div>
    <div className="text-xs text-gray-600"> <button  onClick={createChatt}>create</button> </div>
    </div>
  */}
    {/* second part*

    <div className='flex ml-[130px] gap-2 p-2'>
       
        <div className="">

        <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={()=>chattContainer.onClose()}>
       <X/>
        </button>
        </div>
      </div>
      
    </div>
    <div className="flex items-center my-4 px-2 ">
        <div className="flex-none flex flex-col items-center space-y-1 mr-4">
          <Image className="rounded-full w-10 h-10" src="/users/sample.jpg" alt='j' height={50}  width={50}/>
          <a href="#" className="block text-xs hover:underline">John Doe</a>
        </div>
        <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
 
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
        
        </div>
      </div>
      <div className="flex items-center flex-row-reverse mb-4 px-2">
        <div className="flex-none flex flex-col items-center space-y-1 ml-4">
          <Image className="rounded-full w-10 h-10" src="/users/sample.jpg" alt='user' height={50} width={50} />
          <a href="#" className="block text-xs hover:underline">Jesse</a>
        </div>
        <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>

         
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
         
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex-none flex flex-col items-center space-y-1 mr-4">
        <Image className="rounded-full w-10 h-10" src="/users/sample.jpg" alt='user' height={50} width={50} />
          <a href="#" className="block text-xs hover:underline">John Doe</a>
        </div>
        <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative overflow-x-hidden">
          <div>Lorem ipsum dolor sit amet, consectetur jdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddadipisicing elit.</div>

      
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
      
        </div>
      </div>
      <div className="flex items-center border-t p-2">
    
    
  

      <div className="w-full mx-2 pb-4 flex gap-x-2 items-center">
     

      <div>
        <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
        <SendHorizontal size={28} />
        </button>
      </div>
      </div>


     </div>

</div>
</div>



 
 

  )
}

export default ChattBox
 */}



