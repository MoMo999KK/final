"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
 import { useRouter } from "next/navigation";
 import { User, UserCourse } from "@prisma/client";
 
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
 
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
 

interface Props{
    roomId:string | undefined
}
const formSchema = z.object({
    text: z.string().min(1),
  
  
    
    
   
  });





export const ChattInput = ({roomId}:Props) => {
    console.log("roomId",roomId)
const {toast}=useToast()


const router = useRouter();

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
  text:"",
  
    


  },
});

const { isSubmitting, isValid } = form.formState;

const onSubmit = async (data: z.infer<typeof formSchema>) => {
  try {
    
    const response= await axios.post(`/api/conversation/${roomId}`, data);
    router.refresh()
    form.reset()
    
    toast({title:" success ",description:"sended the message to admin"})
  } catch (error) {
    toast({title:"Failed!",description:"to send the message please try again later"})
    
  }
  

      

  
   
   }





  return (
    <div>
         <div className="flex  ">
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4  items-center gap-3 mt-4"
          >
             <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full">
                    <Input
                      disabled={isSubmitting}
                      placeholder="Message"
                      {...field}
                      className="w-full"
                    />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         

     
            
          </form>
        </Form>
    
   
     
    </div>
    </div>
  )
}

 