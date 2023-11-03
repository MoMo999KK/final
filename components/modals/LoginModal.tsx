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
import { redirect } from "next/dist/server/api-utils";
import { RedirectType, useRouter } from "next/navigation";
 
const formSchema = z.object({
 
  email: z.string().min(1),
  password: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>

const LoginModal= () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModalNow();
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter()

 

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
try {
  
  signIn("credentials",data)
   
   
    
    loginModal.onClose();
  
} catch (error) {
router.push("/")

  
}
   
  }

  const onToggle = useCallback(() => {
    registerModal.onOpen();
    loginModal.onClose();
  }, [registerModal, loginModal])
  
  const handelLogin=()=>{
    try {
      signIn("google")
      loginModal.onClose()
      
    } catch (error) {
      
      
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to E learning"
        subtitle="Create an account!"
      />
         <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
       
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="email" placeholder="email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            Login
          </Button>
          
        </form>
      </Form>
      
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
       
       onClick={handelLogin}
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
            >Register</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;