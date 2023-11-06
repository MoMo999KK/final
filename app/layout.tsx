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


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'show house',
  description: 'buy shoes with 20 procent discount',
  keywords:"shoes ,modern, shoes 20% ,off discount modern shoes ",
  

  
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user=await getCurrentUser()
 
  
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
        
        <Footer />
        </div>
        </div>
        <Toaster/>
        </AuthProvider>
        
        </body>
    </html>
  )
}
