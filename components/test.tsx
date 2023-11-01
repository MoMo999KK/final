"use client"
import { ToggleLeft, ToggleRight } from 'lucide-react'
import React, { useState } from 'react'

export const Test = () => {

  const [ison,setIsOn]=useState(false)
    const changer=()=>{
  setIsOn(!ison)

    }
  return (
    <div >
        {ison?(<ToggleRight className='bg-green-400 ' size={55} onClick={()=>changer()} />):(<ToggleLeft size={55} onClick={()=>changer()} />)}

    </div>
  )
}

