import { Metadata } from "next"
import Link from "next/link"


export const metadata = {
  title: {
    default: "Error ",
    
  },
 

  
}

 

const NotFound = () => {
  return (
    <div className='flex justify-center items-center flex-col bg-blue-100 h-[50vh] w-screen shadow-md'>
      <p className="font-semibold text-3xl">The Page Not Exist </p>
      <Link href={"/"}>Go Back Home</Link>
    </div>
  )
}

export default NotFound