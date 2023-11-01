"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
 import { useRouter } from "next/navigation";
 import { User } from "@prisma/client";
 
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

 
 
const formSchema = z.object({
    imageUrl: z.string().min(1),
 
  
  
 
});

export const CreateSliderImage = ({
  
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
 
  

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        imageUrl: "",
       
 

    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      
      const response= await axios.post("/api/imageSlider", data);
      form.reset()
      router.refresh()
     } catch (error) {
     console.log(error)
      
    }
    

        
     console.log("created")
    
     
     }
  

 

  return (
  
       <div className="flex justify-between ">
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col items-center gap-3 mt-4"
          >
             <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slider image</FormLabel>
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
