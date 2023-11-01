
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

const formSchema = z.object({
    name: z.string().min(1),
   });

   type CatgoryValues = z.infer<typeof formSchema>



export const CreateCategory = () => {
    const router=useRouter()
    const [loading,setLoading]=useState(false)
    const form = useForm<CatgoryValues>({
        resolver: zodResolver(formSchema),
        defaultValues:   {
          name: '',
      
        }
      });
      const onSubmit = async (values: CatgoryValues) => {
     
          setLoading(true);
          try {
              await axios.post("/api/category", values);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
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
 