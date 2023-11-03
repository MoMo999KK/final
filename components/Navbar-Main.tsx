"use client"

import { ArrowBigDown, Blinds, ChevronDown, LogOut, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react'
 

 
    import { useContext, useState } from "react";
  
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import path from 'path';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
 
import { User } from '@prisma/client';
import useLoginModalNow from '@/app/stores/useLogInModal';
import { userInfo } from 'os';
interface Props{
  user:User | null
}
 

export const NavbarMain  = ({user}:Props) => {
      const [scrollY, setScrollY] = useState(0);
      
      
      const [userinfOpen, setUserInfoOpen] = useState(false);
      const pathname=usePathname()
      const {data:session}=useSession()
      const LoginModal=useLoginModalNow()
      const OnOpen=useCallback(()=>{
        setUserInfoOpen((prev)=>!prev)

      },[])



      const handleScroll = () => {
           
           
            setScrollY(window.scrollY);
      };
    
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    
        return window.removeEventListener("scroll", handleScroll);
      }, [scrollY]);
     
      
      return (
        <div className={!scrollY ?" w-full h-[70px] font-bold bg-slate-300/20 text-[14px] z-50 text-black  sticky top-0" : " w-full h-[70px] font-bold text-black text-[14px] bg-slate-200/100" }>
          <div className="flex justify-between items-center p-5 ">
            <div className="font-bold">
              NextCode
            </div>
            <div className="flex items-center gap-4">
              <div className=" flex items-center gap-8">

              <Link className={pathname==="/" ? "shadow-sm border-solid underline  border-gray-400" :""} href={"/"}>Home</Link>
              <Link className={pathname==="/contact" ? "shadow-lg" :""}  href={"/contact"}>Contact</Link>

               {session?.user ? ( <div className="uppercase flex-flex-col cursor-pointer">
                <div className="cursor-pointer flex items-center" onClick={()=>OnOpen()} >
                  <Image src={session.user?.image || "/users/user.png"} alt='user picture' width={40} height={40} className='rounded-full object-cover'/>
                  <ChevronDown />
                </div>
                {userinfOpen && (  <div className="w-[140px] right-2 h-[150px] shadow-md justify-between gap-2 flex flex-col absolute bg-slate-400 rounded-md p-7">
                  <Link href={`/users/${user?.id}`}>Profile</Link>
                  {user?.isInstructor && (
                  <Link href={`/instructor/${user?.id}`}>Teacher</Link>
                  )}
                  {user?.isAdmin && (
                  <Link href={"/adminstrator"} >DashbOard</Link>
                
                  )}
                  <div className="" onClick={()=>signOut()}> 
                  
                  <hr />
                  <LogOut  className='mt-1'/>
                  </div>


                 
                </div>
               )}
              

               </div> ):( <div><Button size={"sm"} onClick={()=>LoginModal.onOpen()}>Login/Register</Button></div> )}
              
              </div>
              
             
              
            </div>
             
            
             
             
          
          </div>
        </div>
      );
    }