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
import { UserCoursePart } from "@prisma/client"
import ImageUpload from "@/components/ui/image-upload"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
interface Props{
    initialData:UserCoursePart | null
}
const formSchema = z.object({

    name: z.string().optional(),
 
    videoUrl: z.string().optional(),
    name1: z.string().optional(),
    name2: z.string().optional(),
    videoUrl2: z.string().optional(),
    name3: z.string().optional(),
    videoUrl3: z.string().optional(),
   
  
     description: z.string().min(3),
     resoursesLink: z.string().optional()


   
  });
 
  
 


export const ChapterEdit = ({initialData}:Props) => {
    const courseId=initialData?.userCourseId
    const chapterId=initialData?.id
    const router=useRouter()
    const {toast}=useToast()

    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name:initialData?.name || '',
          name1:initialData?.name1 || '',
          name2:initialData?.name2 || '',
          name3:initialData?.name3 || '',
        
          videoUrl:initialData?.videoUrl || '',
          videoUrl2:initialData?.videoUrl2 || '',
          videoUrl3:initialData?.videoUrl3 || '',
        
           
          description: initialData?.description || '',
          resoursesLink:initialData?.resoursesLink || ''
        },
      });
    
    



 
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          await axios.patch(`/api/registerCourse/${courseId}/${chapterId}`, values);
           toast({
            title:"change committed succesfully"
          })
          router.refresh();
         
        } catch {
          toast({
            title:"Error comitting failed"
          })
        }
      }
    
 
      const onDelete = async () => {
        try {
          
          await axios.delete(`/api/registerCourse/${courseId}/${chapterId}`);
          toast({title:"chapter Deleted succesfully"})
          router.refresh();
          router.back()

        
         } catch (error: any) {
         } finally {
         
        }
      }
    

    
  return (
    <div className="mr-2 h-full">

         <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/6 h-full mx-5">



       
        <div className="md:grid  gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Title for the Entire Chapter </FormLabel>
                  <FormControl>
                    <Input   placeholder="Chapter Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
    
              </div>
         
          <div className="md:grid  gap-8">
            <FormField
              control={form.control}
              name="name1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firs Title for the First Video </FormLabel>
                  <FormControl>
                    <Input   placeholder="Firs Video's Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <div className="md:grid  gap-8">
            <FormField
              control={form.control}
              name="name2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second Title for the Second Video </FormLabel>
                  <FormControl>
                    <Input   placeholder="Second Video's Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                 <FormField
              control={form.control}
              name="name3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Third Title for the second video(optional) </FormLabel>
                  <FormControl>
                    <Input   placeholder="title for the  third video" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                 <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First video </FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value ? [field.value] : []} 
                       onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               </div>
         
              <FormField
              control={form.control}
              name="videoUrl3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>third video(optional)</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value ? [field.value] : []} 
                       onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
          
          
                  
          </div>
          
              <FormField
              control={form.control}
              name="videoUrl2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vieo Two (optional)</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value ? [field.value] : []} 
                       onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
            
         
          
          
          
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desc</FormLabel>
                  <FormControl>
                    <Input   placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
          
          
                  
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="resoursesLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>resourseLink</FormLabel>
                  <FormControl>
                    <Input   placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
          
          
                  
          </div>
        
        
          <Button   className="ml-auto" type="submit" >
      Create/Edit
          </Button>
        </form>
      </Form>



<div className="">
<p>delete this chapter <Trash2 onClick={()=>onDelete()}/></p></div>

    </div>
    
  )
}

 