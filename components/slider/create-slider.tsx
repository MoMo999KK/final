
"use client"
import * as z from "zod"
import { FormLabel,FormControl,FormMessage,FormItem,FormField,Form } from "../ui/form"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const formSchema = z.object({
    message1 : z.string().min(1),
  
   });

   type SliderValues = z.infer<typeof formSchema>



export const CreateSlider = () => {
    const router=useRouter()
    const [loading,setLoading]=useState(false)
    
    const form = useForm<SliderValues>({
        resolver: zodResolver(formSchema),
        defaultValues:   {
            message1: '',
            
      
        }
      });
      const onSubmit = async (values: SliderValues) => {
     
          setLoading(true);
          try {
              await axios.post("/api/slider", values);
              router.refresh()
              form.reset()
              
            
          } catch (error) {
            
          }
       
          
 
      };
    
    
      
  

      return(
        <div className="flex flex-col">
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="message1"
              render={({ field }) => (
                <FormItem>
                  <Separator className="mt-12"/>
                  <FormLabel>create a new Message</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder=" message1" {...field} />
                  </FormControl>
                  <FormMessage />
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
 