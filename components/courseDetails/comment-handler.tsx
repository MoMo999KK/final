"use client"

import { User, UserCourse } from "@prisma/client"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 import { Trash } from "lucide-react"
 import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { toast, useToast } from "../ui/use-toast"
 interface Props{
    initialData: UserCourse | null 
    isbuyer:User  | null 
}

const formSchema = z.object({
  text: z.string().max(80),
  
});

type BillboardFormValues = z.infer<typeof formSchema>

export const Commenthandler = ({initialData,isbuyer}:Props) => {
    const id=initialData?.id
   const {toast}=useToast()
   const router=useRouter()
 
  

    


    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        text: "",
     
      
   
  
      },
    });
  


  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
       const response= await axios.post("/api/comments",{id,values});
      
       router.refresh()
       form.reset()
       toast({title:"added comment succecfully",description:"please pay attention to our terms and conditions"})
      
     } catch (error) {
      toast({title:"failed to create c course",description:"please check the required fields and try again"})

      
    }
    

        
    
    
     
     }
  


  return (
   
    <div className="flex justify-between">
        
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="space-y-4 flex items-center flex-col gap-3 mt-4 w-full"
      >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                   <Textarea placeholder="add a comment"  {...field}/>
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
          Create
        </Button>
        </div>
      </form>
    </Form>


 
</div>
  )
}


 



 



 