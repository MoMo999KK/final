"use client"

import { Search, X } from "lucide-react"
import { Input } from "./ui/input"
import useSearchContainer from "@/app/stores/use-SeatchContianer"
import { useEffect, useState } from "react"
import { UserCourse } from "@prisma/client"
import axios from "axios"
import { CommandGroup, CommandItem, CommandList } from "cmdk"
import { Command, CommandInput } from "./ui/command"
import { useRouter } from "next/navigation"

const SearchContainer = () => {
  const [input,setInput]=useState<string>("")
  const [getResult,setResult]=useState<UserCourse[] | null >([])

    const searchContainer=useSearchContainer()
    const router=useRouter()
   
    useEffect(()=>{
      const searchFunction=async()=>{
        const {data}=await axios.get(`/api/search?q=${input}`)
        setResult(data)
  
      }
      searchFunction()

    },[input])
  return (
    <div className="overflow-y-hidden h-full w-screen">
          {searchContainer.isOpen &&(
    <div className='absolute h-screen w-screen fade-in-0 z-40 top-0 left-0 opacity-9 bg-blue-400 flex flex-col overflow-y-hidden'>

      <div className="w-4/6 mx-auto flex justify-center items-center border-sky-100 flex-col" > 
      <X size={30} onClick={()=>searchContainer.onClose()} className="absolute right-5 top-4"/>
    
      

    
   </div>
   <Command className={!input.length ? "relative rounded-lg max-w-lg z-50  mx-auto w-[400px] mt-3 md:w-[1000px] h-[45px]"  :"relative rounded-lg max-w-lg z-50 overflow-visible mx-auto w-[400px]  md:w-[1000px] h-[300px]"}>
    <CommandInput className="w-[400px]   md:w-[1000px]" value={input} onValueChange={(text)=>{
      setInput(text)
    }} placeholder="search for courses"/>
    {input.length>0 ?(
      <CommandList className="absolute">
        <CommandGroup className="w-[100px]  h-11">
          {  getResult?.map((result)=>(
            <CommandItem className="mt-12 cursor-pointer" value={result.name!} key={result.id} onSelect={(e)=>{
              router.push(`/courses/${result.id}`)
            }}>
              <p className={input &&"text-green-300 text-center"}>{result?.name}</p>  
            
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    ):null}
    {!getResult?.length && ( <div className="">result:{input.length}</div> )&&(<div className="mt-22">no result</div>)}
   </Command>
   
   
 
   </div>




)}
    </div>
  )
}

export default SearchContainer