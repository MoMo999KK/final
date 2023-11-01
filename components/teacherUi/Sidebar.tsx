import React from 'react'
import { DesktopSidebar } from './Desktop-ui'

const Sidebar = () => {
  return (
    <div>
        <div className="hidden md:block w-[270px] bg-slate-600 h-screen">

        <DesktopSidebar/>
        </div>
    </div>
  )
}

export default Sidebar