
"use client"

{/*
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useToast } from './ui/use-toast';

export const ContactForm = () => {
 
    const formRef = useRef();
    
    const {toast}=useToast()
  
   
    const sendEmail = (e:any) => {
      e.preventDefault();
        //@ts-ignore
     
            emailjs.sendForm('service_pmwrbfv', '123456', formRef.current, 'oJW3PHIZDmli_4gTk')
        
        .then(
          (result) => {
            toast({title:"email is sended succssfully!"})
           
          },
          (error) => {
            toast({title:"email sending failed try aganin later!"})

          }
        );
    };
 

  
  return (
    <div >
    <form
    ref={formRef}
    onSubmit={sendEmail}
    className='flex flex-col'
     
   
  >
    <input type="text" required placeholder="Name" name="name"/>
    <input type="email" required placeholder="Email" name="email"/>
    <textarea rows={8} placeholder="Message" name="message"/>
    <button>Submit</button>
    
  </form>
</div>
  );
};

*/}


