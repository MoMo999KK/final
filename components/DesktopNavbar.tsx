"use client"

import Link from 'next/link'
import React from 'react'
import { UserNav } from './user-nav'
import { Search } from 'lucide-react'
import useSearchContainer from '@/app/stores/use-SeatchContianer'
 import { useSession } from 'next-auth/react'
import { Button } from './ui/button'
 
import useLoginModalNow from '@/app/stores/useLogInModal'
import useRegisterModal from '@/app/stores/useRegisterModal'
import { usePathname } from 'next/navigation'

const DesktopNavbar = () => {
  const searchContainer=useSearchContainer()
  const loginModal=useLoginModalNow()
  const registerModal=useRegisterModal()
  const{data}=useSession()
  const pathName=usePathname()

  return (
    <div className='flex w-full justify-between items-center px-5 pt-3'>
      
     
        <div className="self-center flex items-center gap-x-5">
          {data?.user?(  <UserNav/>):(  <div className="flex gap-3"><Button onClick={()=>loginModal.onOpen()}>Login</Button><Button variant={"secondary"} onClick={()=>registerModal.onOpen()}>Register</Button></div>  )}
           
           {!pathName.startsWith("/courses") && !pathName.startsWith("/users") && !pathName.startsWith("/about")   &&(<Search onClick={()=>searchContainer.onOpen()} />) }
         

        </div>
        <div className="flex items-center gap-4">
            <Link href={"/"}>Home</Link>

            <Link href={"/about"}>About</Link>
            <Link href={"/Contact"}>Contact</Link>
        </div>
        <div className="">
        logo

        
        </div>

    </div>
  )
}

export default DesktopNavbar