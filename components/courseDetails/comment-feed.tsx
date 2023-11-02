
"use client"
import { Comments, Reply, User, UserCourse } from "@prisma/client"
import Image from "next/image"
import { Button } from "../ui/button"
import { Edit, Heart, Link, MessageCircle, MessageSquare, MoreHorizontal, MoreVertical, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HandelReplyComment } from "./handel-reply-cmments";
import { Input, comment } from "postcss";
interface  AllComments{
  id: string;
  text:string;
  createdAt:Date;
  updatedAt:Date;
  userId:string;
  userCourseId:string;
  isHidded:boolean
  
  
  
  user: {
    id: string;
    name: string  
    email: string  
    emailVerified: Date  
    image: string  
    canComment: boolean;
    phonenumber: string  
    
    boughtCourses: string[];
  
},
reply:{
  
  user: {
    id: string;
    name: string  
    email: string  
    emailVerified: Date  
    image: string  
    canComment: boolean;
    phonenumber: string  
    
    boughtCourses: string[];
  
},
id:string;
text:string;
createdAt:string;
updatedAt:string;
userId:string;
commentId:string


}[],









}  


 
interface Props{
  dataProps:  Comments[] | null  | undefined
    isbuyer:User | null
}

const CommentFeed = ({dataProps,isbuyer}:Props) => {
  console.log("this is the commetn we got",dataProps)
  const [showInput,setShowInput]=useState(false)
  const [showReplies,setShowReplies]=useState(false)
   const {toast}=useToast()
  const router=useRouter()

 
  
   const onDelete= async (commentId:string)=>{
    try {
      const res=await axios.delete(`/api/comments/${commentId}`)
      toast({title:"comment deleted succesfully"})
      router.refresh()
    } catch (error) {
      toast({title:"coudnt delete the comment"})
    }


   }
  return (
    <>
     <div className="antialiased mx-auto max-w-screen-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{comment.length? "Comments" : "Add a Comment/Questions"}</h3>
    
        {dataProps?.map((data:Comments)=> 
      <div className="space-y-4" key={data.id}>
     
        
        <div className="flex">
          <div className="flex-shrink-0 mr-3">
          <Image className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" height={30} width={30} src="/users/messi.jpg" alt="d"/>
          </div>
          <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <strong>{data.user.name}</strong> <span className="text-xs text-gray-400">{data.createdAt.toLocaleDateString()} </span>
            <p className="text-sm">
             {data.text}
            </p>
            <button className="flex items-center gap-1" onClick={()=>setShowInput(!showInput)}><MessageSquare  />Reply</button>
            {showInput &&( <HandelReplyComment  commentId={data.id}/>)}

           
         
              <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">{data?.reply.length > 0 && (<div className="">Replies</div> )}</h4>
           
              
              <div className="space-y-4">
              
              {data.reply.map((replayComment:Reply)=>(
              <div className="flex" key={replayComment.id}>
                <div className="flex-shrink-0 mr-3">
                <Image className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" height={30} width={30} src="/users/messi.jpg" alt="d"/>
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <strong>{replayComment?.user.name}</strong> <span className="text-xs text-gray-400">{replayComment.createdAt.toLocaleDateString()}</span>
                  <p className="text-xs sm:text-sm">
                   {replayComment.text}
                  </p>
                
                </div>
              </div>
              ))}
              
              
            </div>
            


          </div>
        </div>
         
      </div>
        )}
    </div>
    </>
   
  )
}

export default CommentFeed





{/*
 <div>
        {dataProps?.length ?(
            <div className="space-y-[200px]">
              {dataProps.map((comment)=>(
                <div className="flex w-full h-[130px] shadow-lg border-red-100 gap-2 relative ]" key={comment.id}>
                  <div className="w-2/6 flex flex-col gap-2 flex-wrap p-3 relative ">
                  <Image src={comment?.user?.image  || "/users/user.png"} height={100} className="rounded-full  object-cover h-12 w-12 shadow-2xl" width={100} alt="user"/>
               
                 <p className="text-xs flex items-center  h-ful flex-wrap flex-1 overflow-hidden "> {comment?.user?.name.slice(0,12)}</p>
                 <div className=" bg-slate-300 w-[380px] h-full overflow-hidden rounded-lg p-2 pt-3  ">
                 <div className=" bg-slate-300  h-full overflow-x-visible rounded-lg p- relative top-2">
                  <p>                 {comment.text}</p>
                   <div className="absolute left-0 bottom-0 flex">
                    
                    
                  <p className=" "></p>
                  <p className=""><Heart /></p>

                  </div>
             
                 </div>
                 </div>
                 <div className="absolute bottom-[-200px] overflow-hidden w-[1000px] gap-10">
                 
                  <div className="w-full  h-[1000px] shadow-sm flex gap-12 ">   <p>{comment.reply.map((reply)=>(
                  <div className="flex gap-5 w-[400px] bg-emerald-300 mt-4 items-center" key={reply.id} >
                    <Image src={reply?.user?.image || "/users/user.png" } height={40} width={40} alt="user image"/>
                    <p className="text-xs ">{reply.text}</p>
                  </div>
                 ))}</p> </div>
                 <HandelReplyComment  commentId={comment.id} />
                 </div>
                 {comment?.userId===isbuyer?.id && ( 
                   <div className="self-start absolute left-1 top-9 fex flex-col">
                  <MoreVertical onClick={()=>seTShowButtons(!showButtons)}/> 
                  {showButtons && (
                    <div className=" flex flex-col z-30">
                  <Button variant={"ghost"}><Edit size={20}/></Button>
                  <Button onClick={()=>onDelete(comment.id)}  variant={"ghost"}><Trash2 size={22}/></Button>
                  </div>
                  )}
                 
                 </div>
                      

                     
                    




                 )}
              
                  
                

                </div>
               </div>
              ))}
                  
           
             

              </div>
            
            
            
            ):(<div className="">no commetn yet</div> )}

           
    </div>

*/}