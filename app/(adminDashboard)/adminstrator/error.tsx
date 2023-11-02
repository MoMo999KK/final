"use client"

import Link from "next/link";

//if(!sessio) throw new AuthError
interface Props{
  error:Error;
  reset:()=>void
}
const Error = ({error,reset}:Props) => {
  return (
    <div className="grid min-h-full px-6 py-24 sm:py-32 lg:px-8 bg-blue-100">
      <div className="text-center">
        <p  className="text-base font-semibold text-emerald-700">There Was A Problem</p>
        <h1 className="font-bold tracking-tight text-zinc-900 sm:text-5xl">{ "something went wrong"}</h1>
        <p className="mt-4 text-base leading-7 text-zinc-700">please try again later</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button onClick={reset}>Try Again</button>
          <Link href={"/"}>Go Back Home</Link>
        </div>
      </div>

    </div>
   
  )
}

export default Error

 