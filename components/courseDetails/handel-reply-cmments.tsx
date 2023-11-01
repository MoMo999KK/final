"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
 import { useState } from "react";
 import { useRouter } from "next/navigation";
  
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ImageUpload from "../ui/image-upload";
import { useSession } from "next-auth/react";
import { User, UserCourse } from "@prisma/client";
import { useToast } from "../ui/use-toast";
 
 
const formSchema = z.object({
  text: z.string().min(1),
 
    
 
  
  
 
});

interface Props{
  commentId:string | undefined
}

export const  HandelReplyComment=({commentId}:Props)=>{
  const router=useRouter()
  const {toast}=useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
   
    
 

    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
       const response= await axios.post(`/api/comments/${commentId}`,values);
       form.reset()
     
       router.refresh()
         toast({title:"added reply succecfully",description:"please pay attention to our terms and condtions"})
      
     } catch (error) {
      toast({title:"failed to create c course",description:"please check the required fields and try again"})

      
    }
    

        
    
    
     
     }
         return ( 
       <div className="flex justify-between">
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex items-center flex-col gap-3 mt-4"
          >
             <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="">
                    <Input
                     
                      placeholder="Reply"
                      {...field}
                    />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               

     
            
              <div className="order-1">
            
            <Button
           
              type="submit"
              variant={"default"}
              size={"sm"}
            >
              Reply
            </Button>
            </div>
          </form>
        </Form>
    
   
     
    </div>
  )
}