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
import ImageUpload from "../ui/image-upload";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";

 
interface Props{
user:User | null
}
const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),

  
  
 
});

export const CreateCourseForm = ({
  user
 
}: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const userId=user?.id
  const { toast } = useToast()
 
  

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name:"",
    price:0
      
 

    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      
      const response= await axios.post("/api/registerCourse", data);
      router.refresh()
      router.push(`/instructor/${userId}/create/${response.data.id}`)
      toast({title:"course successfully created!",description:"now you will be redirected to the details page to modify that"})
    } catch (error) {
      toast({title:"Faied to create a course contact admin or try again!",description:"This could be depended on many things"})
      
    }
    

        
 
    
     
     }
  

 

  return (
  
       <div className="flex  ">
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4  items-center gap-3 mt-4"
          >
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="">
                    <Input
                      disabled={isSubmitting}
                      placeholder="Name"
                      {...field}
                    />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                 <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number"  placeholder="9.99" {...field} />
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
              Create Course
            </Button>
            </div>
          </form>
        </Form>
    
   
     
    </div>
  )
}
