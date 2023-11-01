"use client"
import { AlignJustify, Search } from 'lucide-react'
 import { UserNav } from './user-nav'
import useSearchContainer from '@/app/stores/use-SeatchContianer'
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'
import useLoginModalNow from '@/app/stores/useLogInModal'
import useRegisterModal from '@/app/stores/useRegisterModal'
import { usePathname } from 'next/navigation'
 

const MobileNavbar = () => {
  const searchContainer=useSearchContainer()

  const {data}=useSession()
  const loginModal=useLoginModalNow()
  const registerModal=useRegisterModal()
 const pathName=usePathname()
  return (
    <div className='h-full sticky top-0 shadow-sm bg-white flex justify-between items-center px-7'>
        <div className="flex gap-x-5 items-center">
          {data?.user?(


        <UserNav/>
        ):( <div className="flex gap-2"> <Button onClick={()=>loginModal.onOpen()}>Login</Button><Button onClick={()=>registerModal.onOpen()}>Register</Button></div> )}
                   {!pathName.startsWith("/courses") && !pathName.startsWith("/users")  &&(<Search color='white' onClick={()=>searchContainer.onOpen()} />) }

                

        </div>
        logo
        <AlignJustify />


    </div>
  )
}

export default MobileNavbar