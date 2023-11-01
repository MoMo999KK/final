import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
       <div className=""> <Loader2 className='animate-spin'/></div>
    </div>
  )
}

export default loading