"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
 
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";

interface Props {
  initialData: {
    name: string | null
    id:string | null
    email: string | null
    isAdmin: boolean | null
    isInstructor: boolean | null
    address: string | null
    phonenumber: string | null;
   
    canComment: boolean | null
    postcode: string | null
  }  
 
};

const formSchema = z.object({
    name:z.string().optional(),
  email:z.string().optional(),
  address:z.string().optional(),
  postcode:z.string().optional(),
  phonenumber:z.string().optional(),
 
 
});



 



export const EditUserFullInfoForm = ({initialData}:Props ) => {
 const userId=initialData.id
 
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      address: initialData?.address || "",
      postcode: initialData?.postcode || "",
     
      phonenumber: initialData?.phonenumber || "",
      
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/users/informations/${userId}`, values);
      
       form.reset()
      router.refresh();
    } catch {
   
     }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Edit Full informtion
       
      </div>
    
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="string"   placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email"   placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input type="address"   placeholder="address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                     <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post code</FormLabel>
                  <FormControl>
                    <Input type="postcode"   placeholder="postcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input type="mobile"   placeholder="mobile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      
        
       
            <div className="flex items-center gap-x-2">
              <Button
                disabled={isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
    
    </div>
  )
}

