 "use client"
 import MobileNavbar from './MobileNavbar'
import DesktopNavbar from './DesktopNavbar'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathName=usePathname()
     
     
  return (
    <div className=''>
        <div className="hidden md:block">

        <DesktopNavbar/>
        </div>
        <div className="md:hidden">

        <MobileNavbar/>
        </div>

        

    </div>
  )
}

export default Navbar