import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'
import { NavbarMain } from '@/components/Navbar-Main'
import { getCurrentUser } from './actions/get-current-user'
 import { db } from '@/lib/prismaDB'
import { findCurrenAdmin } from './actions/findCurrentAdmin'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Next  Code ",
    template: "%s - Next Code ",
  },
  description: "Buy Online & modern courses ",
  
  
  

  
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user=await getCurrentUser()
  const admin=await findCurrenAdmin()
 
  
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
        <LoginModal/>
        <RegisterModal/>
        <NavbarMain user={user}/>
       
        <div className=" ">



        {children}
        <div className=" bottom-0 w-full">
        
        <Footer admin={admin} />
        
        </div>
        </div>
        <Toaster/>
        </AuthProvider>
        
        </body>
    </html>
  )
}
