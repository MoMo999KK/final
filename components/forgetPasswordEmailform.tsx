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
 
import { useSession } from "next-auth/react";
import { User, UserCourse } from "@prisma/client";
import { useToast } from "./ui/use-toast";
 
 
const formSchema = z.object({
  email: z.string().min(1),
 
    
 
  
  
 
});

export const ForgetPasswordEmailCOmponent = ({

 
 
 
} ) => {
  const { toast } = useToast()
  
   const [isUpdating, setIsUpdating] = useState(false);
   
  

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
   
    
 

    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
       const response= await axios.post("/api/forgetPassword",values);
       console.log("response",response)
       router.refresh()
       form.reset()
       toast({title:"added name succecfully",description:"You will be redirected to the details page soon"})
      
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="">
                    <Input
                      disabled={isSubmitting}
                      placeholder="email"
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
              Create
            </Button>
            </div>
          </form>
        </Form>
    
   
     
    </div>
  )
}
