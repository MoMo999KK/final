"use client"
import { Session } from "next-auth";
import {SessionProvider} from "next-auth/react"

interface Children{
    children:React.ReactNode;
    session?:Session | null
}

export const AuthProvider = ({children,session}:Children) => {
  return (
    <SessionProvider session={session} basePath="/">{children}</SessionProvider>
  )
}

