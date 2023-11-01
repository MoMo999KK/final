 

"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useRouter } from "next/navigation";
import{UserCourse, UserCoursePart} from "@prisma/client"
import { Category } from "@prisma/client";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
  categories:Category[] | null,
  initialData:UserCourse | null
  

 
};

 


const formSchema = z.object({
 
  categoryId: z.string().min(1),
 
});



export const ChoseCategoryForm = ({initialData,categories}:TitleFormProps) => {
  const categoryId=initialData?.categoryId
  const router=useRouter()
 
 
  const courseId=initialData?.id
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
    categoryId:initialData?.categoryId || ""}
  });

 

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/registerCourse/${courseId}`, values);
       
    } catch {
      console.log("faield to edit")
     }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
     
     
      </div>
       
        <p className="text-sm mt-2">
          {initialData?.categoryId}
        </p>
     
      
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category:Category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
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

