import { ArrowBigLeft } from "lucide-react"
import Link from "next/link"

interface Pros{
    title:string,
    isbackLinks?:boolean;
    teacher?:string;
    
}
const Header = ({title,isbackLinks,teacher}:Pros) => {
  return (
    <div className="w-full h-[60px]  ">
    <div className="flex justify-between w-full">


      <div className="">
        <h1 className="font-bold hover:visited:bg-slate-500">{title}</h1>
        </div>
        {
          isbackLinks&&( <div className=""><Link href={"/"}><ArrowBigLeft className="cursor-pointer hover:bg-blue-400"/></Link></div>)
        }
        
         <div className="">teacher:{teacher}</div>
      
        </div>



    </div>
  )
}

export default Header