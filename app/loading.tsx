import { Loader2 } from 'lucide-react'

const loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center fade-in-5'>
       <div className=""> <Loader2 className='animate-spin'/></div>
    </div>
  )
}

export default loading