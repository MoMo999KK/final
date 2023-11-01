
"use client"
import * as z from "zod"
import { FormLabel,FormControl,FormMessage,FormItem,FormField,Form, FormDescription } from "../ui/form"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { UserCourse } from "@prisma/client";


 interface Props{
  initialData:UserCourse | null,
  courseId:string | undefined
}
const formSchema = z.object({
  isFree: z.boolean().default(false).optional(),

   });

   type CatgoryValues = z.infer<typeof formSchema>



export const IsFreeForm = ({initialData,courseId}:Props) => {
    const router=useRouter()
    const [loading,setLoading]=useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         isFree:initialData?.isFree || false
         
   
  
      },
    });
      const onSubmit = async (values: CatgoryValues) => {
     
          setLoading(true);
          try {
            await axios.patch(`/api/registerCourse/${courseId}`, values)       
              form.reset()
              router.refresh()
            
          } catch (error) {
            
          }
       
          
 
      };
    
    
      
  

      return(
        <div className="flex flex-col">
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        
          <div className="md:grid md:grid-cols-3 gap-8">
           isfree? {initialData?.isFree}
          <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                     Choose wheter the Entire course is free/not
                    </FormLabel>
                    <FormDescription>
                     OBS: if you set it to free it will be published immediately and only the admin will be able to change it!!
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
           Create
          </Button>
        </form>
      </Form>

        </div>
      )
}
 