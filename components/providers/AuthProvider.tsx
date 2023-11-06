"use client"
import { Session } from "next-auth";
import {SessionProvider} from "next-auth/react"

interface Children{
    children:React.ReactNode;
   
}

export const AuthProvider = ({children}:Children) => {
  return (
    <SessionProvider  basePath="/">{children}</SessionProvider>
  )
}

