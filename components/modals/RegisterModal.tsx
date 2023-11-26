'use client';

 

import * as z from "zod"
import axios from "axios" 
import { signIn } from "next-auth/react";
 import { useCallback, useState } from "react";
 import { zodResolver } from "@hookform/resolvers/zod"
 import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
 
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
 
import useRegisterModal from "@/app/stores/useRegisterModal";

import Modal from "./Modal";
 
import { Heading } from "../Heading";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
 import { Input } from "../ui/input";
import useLoginModalNow from "@/app/stores/useLogInModal";
 
const formSchema = z.object({
  name: z.string().min(4),
  email: z.string().min(4),
  password: z.string().min(1).max(40),
});

type BillboardFormValues = z.infer<typeof formSchema>

const RegisterModal= () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModalNow();
  const [isLoading, setIsLoading] = useState(false);

 

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() => {
     
      registerModal.onClose();
      loginModal.onOpen();
    })
    .catch((error) => {
     console.log(error)
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4 z-999">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account!"
      />
         <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                  <Input disabled={isLoading} placeholder="name" {...field} />

                   
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            Register
          </Button>
          
        </form>
      </Form>
      
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
       
        onClick={() => signIn('google')} 
      >Google</Button>
      <Button 
       
        onClick={() => signIn('github')}
      ><Github/></Button>
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;