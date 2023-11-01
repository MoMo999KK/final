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
  videoDuration:z.string().optional() ,
  name: z.string().min(1),
    videoUrl: z.string().min(1),
    name2: z.string().optional(),
    videoUrl2: z.string().optional(),
    name3: z.string().optional(),
    videoUr3: z.string().optional(),
    name4: z.string().optional(),
    videoUr4: z.string().optional(),
     description: z.string().min(3),
     resoursesLink: z.string().optional()


   
  });
  type ChapterFormValues = z.infer<typeof formSchema>
  
 


export const ChapterEdit = ({initialData}:Props) => {
    const courseId=initialData?.userCourseId
    const chapterId=initialData?.id
    const router=useRouter()
    const {toast}=useToast()

    const form = useForm<ChapterFormValues>({
        resolver: zodResolver(formSchema),
      
        defaultValues:  {
          name: '',
          name2: '',
          name3: '',
          name4: '',
          videoDuration: '',
          videoUrl: '',
          videoUrl2: '',
        
          videoUrl4: '',
          description: '',
          resoursesLink: ''
        } 
      });
      const loading=form.formState.isSubmitted





      const onSubmit = async (values: ChapterFormValues) => {
        try {
           
        
            await axios.patch(`/api/registerCourse/${courseId}/${chapterId}`, values);
            toast({
              title:"change committed succesfully"
            })
        
        
        
        } catch (error: any) {
          toast({
            title:"failed to  committ the change",description:"please trx again later"
          })
         } finally {
         }
      };
    
 
      const onDelete = async () => {
        try {
          
          await axios.delete(`/api/registerCourse/${courseId}/${chapterId}`);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name </FormLabel>
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
              name="name2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second Title for the second video </FormLabel>
                  <FormControl>
                    <Input   placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="videoUrl3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second video(optional)</FormLabel>
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
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
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
              name="videoDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VideoDuration</FormLabel>
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
        
        
          <Button   className="ml-auto" type="submit" disabled={form.formState.isSubmitting}>
      Create/Edit
          </Button>
        </form>
      </Form>



<div className="">
<p>delete this chapter <Trash2 onClick={()=>onDelete()}/></p></div>

    </div>
  )
}

 