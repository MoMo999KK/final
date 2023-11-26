"use client"

import { User } from "@prisma/client"
import { redirect, usePathname } from "next/navigation"

interface Props{
  admin:User | null
}

const Footer = ({admin}:Props) => {
  const pathname=usePathname()
  if(pathname.startsWith("/adminstrator") && !admin?.isAdmin){
    redirect("/")

  }

  return (
    <div className=' bg-slate-200 mt-[460px]   h-[200px] w-full shadow-sm mx-auto rounded-md'>Footer</div>
  )
}

export default Footer