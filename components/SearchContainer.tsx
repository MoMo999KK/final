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
 
    const router=useRouter()
   
    useEffect(()=>{
      const searchFunction=async()=>{
        const {data}=await axios.get(`/api/search?q=${input}`)
        setResult(data)
  
      }
      searchFunction()

    },[input])
  return (
    <div className="  h-full w-[500px] relative">
          
    <div className='absolute h-[250px] w-[500px] fade-in-0 z-40 md:top-[65%] top-[15%] md:left-[157%] left-[30%] opacity-9  flex flex-col '>

 
   <Command className={!input.length ? "relative rounded-lg max-w-lg z-50  mx-auto w-[400px] mt-3 md:w-[1000px] h-[45px] bg-slate-400"  :"relative rounded-lg max-w-lg z-50  mx-auto w-[400px]  md:w-[1000px] h-[300px]"}>
    <CommandInput className="w-[400px]   md:w-[1000px] " value={input} onValueChange={(text)=>{
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




 
 
    
    </div>
  )
}

export default SearchContainer