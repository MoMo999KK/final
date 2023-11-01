"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
  import { Trash, Trash2 } from "lucide-react"
 import { useParams, useRouter } from "next/navigation"
 import { useForm } from "react-hook-form"


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { MessageNotification, UserCoursePart } from "@prisma/client"
import ImageUpload from "@/components/ui/image-upload"
import Link from "next/link"
interface Props{
    initialData:MessageNotification | null
}
const formSchema = z.object({
    message1: z.string().min(1),
  


   
  });
  type ChapterFormValues = z.infer<typeof formSchema>
  
 


export const MessageSliderEdit= ({initialData}:Props) => {
  const messageId=initialData?.id
 
    const router=useRouter()

    const form = useForm<ChapterFormValues>({
        resolver: zodResolver(formSchema),
        //@ts-ignore
        defaultValues: initialData
      });
      const loading=form.formState.isSubmitted





      const onSubmit = async (values: ChapterFormValues) => {
        try {
           
        
            await axios.patch(`/api/message/${messageId}`, values);
        
        
        
        } catch (error: any) {
         } finally {
         }
      };
    
 
      const onDelete = async () => {
        try {
          
          await axios.delete(`/api/message/${messageId}`);
          router.refresh();
          router.back()

        
         } catch (error: any) {
         } finally {
         
        }
      }
    

    
  return (
    <div>

         <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
    
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="message1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mesage Edit</FormLabel>
                  <FormControl>
                    <Input   placeholder="slider " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
          
          
                  
          </div>
          
        
          <Button   className="ml-auto" type="submit">
          Edit
          </Button>
        </form>
      </Form>



<div className="">
<p>delete this chapter <Trash2 onClick={()=>onDelete()}/></p></div>

    </div>
  )
}

 