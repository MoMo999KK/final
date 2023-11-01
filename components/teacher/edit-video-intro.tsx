
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
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "../ui/image-upload";
import { UserCourse } from "@prisma/client";

 

const formSchema = z.object({
    coverVideo: z.string().min(1, {
    message: "cover Video is required",
  }),
});



interface Props{
  initialData:UserCourse | null
 ,
  courseId:string | undefined

}



const EditVideoForm = ({initialData,courseId}:Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverVideo:initialData?.coverVideo|| ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/registerCourse/${courseId}`, values);
       toggleEdit();
       form.reset()
      router.refresh();
    } catch {
      console.log("faield to edit")
     }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Change/upload a cover  Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit cover Video
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-xs overflow-x-scroll mt-2">
          {initialData?.coverVideo}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
             <FormField
              control={form.control}
              name="coverVideo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>coverVideo</FormLabel>
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
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default EditVideoForm